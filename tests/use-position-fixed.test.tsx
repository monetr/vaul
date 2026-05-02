import { renderHook } from '@rstest/browser-react';
import { afterEach, expect, test } from '@rstest/core';

import { usePositionFixed } from '../src/use-position-fixed';

afterEach(() => {
  // Reset body styles between tests so leakage from one test doesn't poison the next.
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.height = '';
  document.body.style.right = '';
});

test('navigator.userAgent reports Safari (so isSafari() returns true)', () => {
  expect(navigator.userAgent).toMatch(/Safari/);
  expect(navigator.userAgent).not.toMatch(/Chrome/);
});

test('matchMedia standalone is false (otherwise setPositionFixed is skipped)', () => {
  expect(window.matchMedia('(display-mode: standalone)').matches).toBe(false);
});

// Yield long enough for React's useEffect to flush after a rerender.
const flushEffects = () => new Promise(r => setTimeout(r, 50));

test('sets and restores body position styles around isOpen', async () => {
  const { rerender } = await renderHook(
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

  await rerender({ isOpen: true });
  await flushEffects();
  expect(document.body.style.position).toBe('fixed');

  await rerender({ isOpen: false });
  await flushEffects();
  expect(document.body.style.position).toBe('');
});
