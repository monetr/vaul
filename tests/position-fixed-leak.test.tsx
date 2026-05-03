import { renderHook } from '@rstest/browser-react';
import { afterEach, beforeEach, expect, test } from '@rstest/core';

import { usePositionFixed } from '../src/use-position-fixed';

// `previousBodyPosition` in usePositionFixed is a module-level singleton, so two drawers
// stacked or remounted overlapping each other share state. The second instance to call
// setPositionFixed sees `previousBodyPosition !== null` and skips the capture. When the first
// instance restores+nulls the global, the second sees null and skips its restore. Body styles
// leak.

const flushEffects = () => new Promise(r => setTimeout(r, 60));

let originalPlatformDescriptor: PropertyDescriptor | undefined;

beforeEach(() => {
  originalPlatformDescriptor = Object.getOwnPropertyDescriptor(window.navigator, 'platform');
  Object.defineProperty(window.navigator, 'platform', { value: 'iPhone', configurable: true });
});

afterEach(() => {
  if (originalPlatformDescriptor) {
    Object.defineProperty(window.navigator, 'platform', originalPlatformDescriptor);
  } else {
    delete (window.navigator as { platform?: string }).platform;
  }
  document.body.style.cssText = '';
});

test('two stacked usePositionFixed instances both restore body styles', async () => {
  const baseline = document.body.style.cssText;

  const first = await renderHook(
    (props?: { isOpen: boolean }) =>
      usePositionFixed({
        isOpen: props?.isOpen ?? false,
        modal: true,
        nested: false,
        hasBeenOpened: true,
        preventScrollRestoration: false,
        noBodyStyles: false,
      }),
    { initialProps: { isOpen: false } },
  );
  await first.rerender({ isOpen: true });
  await flushEffects();

  // Second instance mounts on top of the first. The module-level `previousBodyPosition` is
  // already non-null, so this instance never captures its own snapshot.
  const second = await renderHook(
    (props?: { isOpen: boolean }) =>
      usePositionFixed({
        isOpen: props?.isOpen ?? true,
        modal: true,
        nested: false,
        hasBeenOpened: true,
        preventScrollRestoration: false,
        noBodyStyles: false,
      }),
    { initialProps: { isOpen: true } },
  );
  await flushEffects();

  // First instance closes -> restorePositionSetting() runs, nullifies the module-level global.
  await first.rerender({ isOpen: false });
  await flushEffects();

  // Second instance closes -> sees null, skips restore. Body styles remain leaked.
  await second.rerender({ isOpen: false });
  await flushEffects();

  first.unmount();
  second.unmount();

  expect(document.body.style.cssText).toBe(baseline);
});
