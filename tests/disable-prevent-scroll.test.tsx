import { render, renderHook } from '@rstest/browser-react';
import { afterEach, beforeEach, describe, expect, rstest, test } from '@rstest/core';

import { PreventScrollDrawer } from './fixtures/PreventScrollDrawer';
import { usePreventScroll } from '../src/use-prevent-scroll';

// Bug A: src/index.tsx wiring used to OR `!disablePreventScroll` into the isDisabled condition,
// which inverted the prop's documented semantics. These tests cover the hook contract directly
// and the wiring through Drawer.Root.

const flushEffects = () => new Promise(r => setTimeout(r, 50));

// Real touch event with a populated Touch list. react-remove-scroll's listeners read
// touches[0].clientX, so an empty TouchEvent throws inside their handler.
function dispatchTouch(
  type: 'touchstart' | 'touchmove' | 'touchend',
  target: EventTarget,
  clientX = 10,
  clientY = 10,
) {
  const touch = new Touch({
    identifier: 0,
    target: target as EventTarget,
    clientX,
    clientY,
    pageX: clientX,
    pageY: clientY,
    screenX: clientX,
    screenY: clientY,
    radiusX: 1,
    radiusY: 1,
    rotationAngle: 0,
    force: 1,
  });
  const touches = type === 'touchend' ? [] : [touch];
  const ev = new TouchEvent(type, {
    bubbles: true,
    cancelable: true,
    composed: true,
    touches,
    targetTouches: touches,
    changedTouches: [touch],
  });
  target.dispatchEvent(ev);
  return ev;
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
  test('isDisabled=false engages prevent-scroll, isDisabled=true releases it', async () => {
    // No Dialog rendered here, so only vaul's listeners are in play. A touchmove on body with
    // no scrollable parent gets preventDefaulted by the iOS branch.
    const probe = () => {
      dispatchTouch('touchstart', document.body);
      const ev = dispatchTouch('touchmove', document.body, 10, 30);
      dispatchTouch('touchend', document.body);
      return ev.defaultPrevented;
    };

    const { rerender, unmount } = await renderHook(
      (props?: { isDisabled: boolean }) => usePreventScroll({ isDisabled: props?.isDisabled ?? false }),
      { initialProps: { isDisabled: false } },
    );
    await flushEffects();

    expect(probe()).toBe(true);

    await rerender({ isDisabled: true });
    await flushEffects();

    expect(probe()).toBe(false);

    unmount();
  });
});

describe('Drawer.Root disablePreventScroll prop', () => {
  // Click the trigger so Radix's onOpenChange fires hasBeenOpened=true. Without this, the
  // `!hasBeenOpened` term in the isDisabled condition forces preventScroll off regardless of
  // the prop, masking the wiring.
  async function openViaTrigger() {
    const trigger = document.querySelector<HTMLElement>('[data-testid="trigger"]');
    if (!trigger) throw new Error('trigger not mounted');
    trigger.click();
    await flushEffects();
  }

  // vaul's preventScrollMobileSafari registers `touchmove` on document with the unusual
  // { passive: false, capture: true } combo (use-prevent-scroll.ts:228). react-remove-scroll
  // and Radix don't register a touchmove listener with both flags set, so this is a clean
  // signal that vaul specifically engaged.
  function vaulEngaged(spy: ReturnType<typeof rstest.spyOn<Document, 'addEventListener'>>) {
    return spy.mock.calls.some(call => {
      if (call[0] !== 'touchmove') return false;
      const opts = call[2];
      return !!opts && typeof opts === 'object' && (opts as AddEventListenerOptions).passive === false && (opts as AddEventListenerOptions).capture === true;
    });
  }

  test('disablePreventScroll=true does NOT engage vaul scroll-prevention', async () => {
    const spy = rstest.spyOn(document, 'addEventListener');
    await render(<PreventScrollDrawer disablePreventScroll />);
    await openViaTrigger();
    expect(vaulEngaged(spy)).toBe(false);
  });

  test('disablePreventScroll=false engages vaul scroll-prevention', async () => {
    const spy = rstest.spyOn(document, 'addEventListener');
    await render(<PreventScrollDrawer disablePreventScroll={false} />);
    await openViaTrigger();
    expect(vaulEngaged(spy)).toBe(true);
  });
});
