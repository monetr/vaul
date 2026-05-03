import { render } from '@rstest/browser-react';
import { expect, test } from '@rstest/core';

import { InitialSnapDrawer } from './fixtures/InitialSnapDrawer';

// Regression pin. useSnapPoints has a `useEffect` that calls `snapToPoint` whenever
// `activeSnapPoint`/`activeSnapPointProp` are set, and `snapToPoint` applies an inline
// `transition: transform 0.5s ...` via the `set()` helper. In the current harness this effect's
// inline writes are never observable on the drawer (likely because the portal mounts after the
// parent effect runs, leaving drawerRef.current=null when snapToPoint dereferences it). The
// drawer's enter animation is driven by CSS only.
//
// This test pins that behavior: on first mount of a controlled snap-point drawer, the inline
// `transition` and `transform` styles must remain empty. If a future change starts applying an
// inline transform/transition on mount, this test will catch the regression and we can decide
// whether the new behavior is desirable.
test('snap-point drawer does not apply inline transition or transform on initial mount', async () => {
  await render(<InitialSnapDrawer />);

  const drawer = document.querySelector<HTMLElement>('[data-vaul-drawer]');
  if (!drawer) {
    throw new Error('drawer not mounted');
  }

  // Allow any post-commit / rAF effects to settle.
  await new Promise(r => setTimeout(r, 60));

  expect(drawer.style.transition).toBe('');
  expect(drawer.style.transform).toBe('');
});
