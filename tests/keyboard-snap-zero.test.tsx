import { render } from '@rstest/browser-react';
import { afterEach, expect, test } from '@rstest/core';

import { KeyboardSnapDrawer } from './fixtures/KeyboardSnapDrawer';
import { wait } from './helpers';

// In Root's onVisualViewportChange handler the guard
// `if (snapPoints && ... && activeSnapPointIndex)` truthy-checks activeSnapPointIndex. When the
// active snap point is at index 0, the offset adjustment
// `diffFromInitial += snapPointsOffset[activeSnapPointIndex]` is skipped because 0 is falsy.
// Expected behavior (the fix): the offset should be added at index 0 too, the same way it is at
// every other index.

const KEYBOARD_HEIGHT = 300;

let originalViewportHeight: number | undefined;

afterEach(() => {
  if (window.visualViewport && typeof originalViewportHeight === 'number') {
    Object.defineProperty(window.visualViewport, 'height', {
      value: originalViewportHeight,
      configurable: true,
    });
  }
  originalViewportHeight = undefined;
});

test('drawer.style.bottom at snap index 0 includes the snap point offset when keyboard opens', async () => {
  await render(<KeyboardSnapDrawer />);
  await wait(500);

  const drawer = document.querySelector<HTMLElement>('[data-vaul-drawer]');
  if (!drawer) {
    throw new Error('drawer not mounted');
  }

  // Read snapPointsOffset[0] from the --snap-point-height CSS variable that Drawer.Content
  // writes inline based on the active snap-point offset.
  const snapPointHeightStr = drawer.style.getPropertyValue('--snap-point-height');
  const snapPointOffset = parseFloat(snapPointHeightStr);
  expect(snapPointOffset).toBeGreaterThan(0);

  // Simulate the keyboard opening: shrink visualViewport, focus an input, dispatch resize.
  if (!window.visualViewport) {
    throw new Error('visualViewport not available; this test depends on it.');
  }
  originalViewportHeight = window.visualViewport.height;
  Object.defineProperty(window.visualViewport, 'height', {
    value: window.innerHeight - KEYBOARD_HEIGHT,
    configurable: true,
  });

  const input = document.querySelector<HTMLInputElement>('[data-testid="kb-input"]');
  input?.focus();

  window.visualViewport.dispatchEvent(new Event('resize'));
  await wait(60);

  // onVisualViewportChange's else branch sets `bottom = max(diffFromInitial, 0)px` when the
  // keyboard is open. With the fix, diffFromInitial = KEYBOARD_HEIGHT + snapPointOffset.
  // With the current bug, it equals KEYBOARD_HEIGHT only.
  const bottomPx = parseFloat(drawer.style.bottom);
  expect(bottomPx).toBeCloseTo(KEYBOARD_HEIGHT + snapPointOffset, 0);
});
