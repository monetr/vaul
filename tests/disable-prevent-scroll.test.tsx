import { render, renderHook } from '@rstest/browser-react';
import { afterEach, beforeEach, describe, expect, rstest, test } from '@rstest/core';

import { PreventScrollDrawer } from './fixtures/PreventScrollDrawer';
import { usePreventScroll } from '../src/use-prevent-scroll';

// Root's wiring used to OR `!disablePreventScroll` into the isDisabled condition, which
// inverted the prop's documented semantics. We probe vaul's engagement by spying on the
// touchmove listener it registers with `{ passive: false, capture: true }` on document. That
// option combo is unique to vaul's preventScrollMobileSafari and avoids dispatching synthetic
// Touch events, which Firefox doesn't expose unless its touch events flag is on.

const flushEffects = () => new Promise(r => setTimeout(r, 50));

function vaulTouchmoveRegistered(spy: ReturnType<typeof rstest.spyOn<Document, 'addEventListener'>>) {
  return spy.mock.calls.some(call => {
    if (call[0] !== 'touchmove') {
      return false;
    }
    const opts = call[2];
    return (
      !!opts &&
      typeof opts === 'object' &&
      (opts as AddEventListenerOptions).passive === false &&
      (opts as AddEventListenerOptions).capture === true
    );
  });
}

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
  document.documentElement.style.paddingRight = '';
  rstest.restoreAllMocks();
});

describe('usePreventScroll honors isDisabled flag', () => {
  test('isDisabled=false registers vaul touchmove listener, isDisabled=true removes it', async () => {
    const addSpy = rstest.spyOn(document, 'addEventListener');
    const removeSpy = rstest.spyOn(document, 'removeEventListener');

    const { rerender, unmount } = await renderHook(
      (props?: { isDisabled: boolean }) => usePreventScroll({ isDisabled: props?.isDisabled ?? false }),
      { initialProps: { isDisabled: false } },
    );
    await flushEffects();

    expect(vaulTouchmoveRegistered(addSpy)).toBe(true);

    await rerender({ isDisabled: true });
    await flushEffects();

    // The cleanup of preventScrollMobileSafari removes the same listener it added. Asserting on
    // the remove call (rather than re-checking the add list) confirms vaul actually disengaged.
    expect(
      removeSpy.mock.calls.some(call => {
        if (call[0] !== 'touchmove') {
          return false;
        }
        const opts = call[2];
        return (
          !!opts &&
          typeof opts === 'object' &&
          (opts as AddEventListenerOptions).passive === false &&
          (opts as AddEventListenerOptions).capture === true
        );
      }),
    ).toBe(true);

    unmount();
  });
});

describe('Drawer.Root disablePreventScroll prop', () => {
  // Click the trigger so Radix's onOpenChange fires hasBeenOpened=true. Without this, the
  // `!hasBeenOpened` term in the isDisabled condition forces preventScroll off regardless of
  // the prop, masking the wiring.
  async function openViaTrigger() {
    const trigger = document.querySelector<HTMLElement>('[data-testid="trigger"]');
    if (!trigger) {
      throw new Error('trigger not mounted');
    }
    trigger.click();
    await flushEffects();
  }

  test('disablePreventScroll=true does NOT engage vaul scroll-prevention', async () => {
    const spy = rstest.spyOn(document, 'addEventListener');
    await render(<PreventScrollDrawer disablePreventScroll />);
    await openViaTrigger();
    expect(vaulTouchmoveRegistered(spy)).toBe(false);
  });

  test('disablePreventScroll=false engages vaul scroll-prevention', async () => {
    const spy = rstest.spyOn(document, 'addEventListener');
    await render(<PreventScrollDrawer disablePreventScroll={false} />);
    await openViaTrigger();
    expect(vaulTouchmoveRegistered(spy)).toBe(true);
  });
});
