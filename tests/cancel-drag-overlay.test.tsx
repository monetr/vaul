import { render } from '@rstest/browser-react';
import { describe, expect, rstest, test } from '@rstest/core';

import { BaseDrawer } from './fixtures/BaseDrawer';
import { dragVerticallyHold, openDrawer } from './helpers';

// cancelDrag clears dragging flags but does NOT reset the inline opacity that onDrag wrote on the overlay. When
// closeDrawer is invoked from the Radix dialog's onOpenChange path, it goes through cancelDrag, never through
// resetDrawer, so the overlay retains its dragged opacity.
describe('cancelDrag overlay opacity', () => {
  test('overlay opacity is reset when drawer closes mid-drag', async () => {
    await render(<BaseDrawer />);
    await openDrawer();

    const queryOverlay = () => document.querySelector<HTMLElement>('[data-vaul-overlay]');

    // Kick off the drag and poll until onDrag lands its inline opacity write. On a cold-start webkit run React may not
    // have committed `isDragging=true` before the first pointermove, so the first drag attempt can no-op and we
    // re-dispatch another sequence. We re-query the overlay each iteration because Radix Presence can remount it across
    // re-renders, and a stale reference would point to an orphaned node.
    await rstest.waitFor(
      async () => {
        await dragVerticallyHold(400);
        const o = queryOverlay();
        const v = o ? parseFloat(o.style.opacity) : NaN;
        if (!(v > 0 && v < 1)) {
          throw new Error(`overlay opacity not yet in (0,1): ${o?.style.opacity || 'empty'}`);
        }
      },
      { timeout: 3000, interval: 50 },
    );

    const dragOverlay = queryOverlay();
    const dragOpacity = dragOverlay ? parseFloat(dragOverlay.style.opacity) : NaN;
    expect(dragOpacity).toBeGreaterThan(0);
    expect(dragOpacity).toBeLessThan(1);

    // Drive the close via Drawer.Close (Radix). Radix's onClick fires DialogPrimitive.Root's onOpenChange in vaul's
    // Root, which calls closeDrawer(true) -> cancelDrag() and clears the overlay opacity. Native .click() avoids
    // Playwright's actionability check, which times out on Firefox because the drag transform moved the button
    // off-screen.
    const closeBtn = document.querySelector<HTMLElement>('[data-testid="drawer-close"]');
    if (!closeBtn) {
      throw new Error('drawer-close button not mounted');
    }
    closeBtn.click();

    // Poll the currently-mounted overlay (re-querying each tick, since Radix Presence can swap the DOM node during the
    // close transition). Once cancelDrag fires it clears opacity to '', which we accept as 1 here since CSS takes over.
    await rstest.waitFor(
      () => {
        const o = queryOverlay();
        if (!o) {
          return; // unmounted is fine: the bug would leave a 0.x opacity inline
        }
        const v = o.style.opacity;
        const n = v === '' ? 1 : parseFloat(v);
        if (!(Math.abs(n - 1) < 0.05)) {
          throw new Error(`overlay opacity not yet reset: ${v || 'empty'}`);
        }
      },
      { timeout: 1000, interval: 25 },
    );
  });
});
