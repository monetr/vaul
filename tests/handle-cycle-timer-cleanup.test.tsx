import { render } from '@rstest/browser-react';
import { afterEach, expect, rstest, test } from '@rstest/core';

import { HandleDrawer } from './fixtures/HandleDrawer';

// Handle's `closeTimeoutIdRef` and Root's `nestedOpenChangeTimer` have no useEffect cleanup.
// If the component unmounts while a timer is pending, the timer is never cleared. This test
// focuses on the Handle's pointerdown timer (LONG_HANDLE_PRESS_TIMEOUT = 250ms).

afterEach(() => {
  rstest.restoreAllMocks();
});

test('Handle pointerdown timer is cleared when component unmounts before the timer fires', async () => {
  const setTimeoutSpy = rstest.spyOn(window, 'setTimeout');
  const clearTimeoutSpy = rstest.spyOn(window, 'clearTimeout');

  const { unmount } = await render(<HandleDrawer />);

  const handle = document.querySelector<HTMLElement>('[data-testid="handle"]');
  if (!handle) {
    throw new Error('Handle not mounted');
  }

  setTimeoutSpy.mockClear();

  handle.dispatchEvent(
    new PointerEvent('pointerdown', {
      bubbles: true,
      cancelable: true,
      composed: true,
      pointerId: 1,
      pointerType: 'touch',
      isPrimary: true,
      button: 0,
      buttons: 1,
    }),
  );

  // Capture the long-press timer id (LONG_HANDLE_PRESS_TIMEOUT = 250ms). `handleStartInteraction`
  // schedules exactly that timer on pointerdown.
  const longPressIdx = setTimeoutSpy.mock.calls.findIndex(call => call[1] === 250);
  expect(longPressIdx, 'expected handle pointerdown to schedule a 250ms timer').toBeGreaterThanOrEqual(0);
  const longPressId = setTimeoutSpy.mock.results[longPressIdx]?.value;
  expect(longPressId).toBeDefined();

  clearTimeoutSpy.mockClear();
  await unmount();

  // After unmount, the captured timer id must have been cleared. Without the fix, no cleanup
  // exists and `clearTimeout(longPressId)` is never called.
  const cleared = clearTimeoutSpy.mock.calls.some(call => call[0] === longPressId);
  expect(cleared).toBe(true);
});
