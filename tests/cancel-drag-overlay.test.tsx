import { render } from '@rstest/browser-react';
import { describe, expect, test } from '@rstest/core';

import { BaseDrawer } from './fixtures/BaseDrawer';
import { dragVerticallyHold, openDrawer } from './helpers';

// Bug K: src/index.tsx:614-623 — cancelDrag clears dragging flags but does NOT reset the inline
// opacity that onDrag wrote on the overlay (src/index.tsx:447-455). When closeDrawer is invoked
// from the Radix dialog's onOpenChange path (e.g., Escape key), it goes through cancelDrag, never
// through resetDrawer, so the overlay retains its dragged opacity until unmount.

describe('cancelDrag overlay opacity', () => {
  test('overlay opacity is reset when drawer closes via Esc mid-drag', async () => {
    await render(<BaseDrawer />);
    await openDrawer();

    // Hold-drag without releasing -> overlay's inline opacity is set to a fractional value via
    // `set(overlayRef.current, { opacity })` at src/index.tsx:447-455.
    await dragVerticallyHold(400);

    const overlay = document.querySelector<HTMLElement>('[data-vaul-overlay]');
    if (!overlay) {
      throw new Error('Overlay not mounted');
    }
    const dragOpacity = parseFloat(overlay.style.opacity);
    expect(dragOpacity).toBeGreaterThan(0);
    expect(dragOpacity).toBeLessThan(1);

    // Esc closes the dialog -> our onOpenChange handler (src/index.tsx:786-797) calls
    // closeDrawer(true) -> cancelDrag(). With the bug, cancelDrag leaves the overlay's inline
    // opacity at the dragged value.
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));

    // Read the inline opacity synchronously, before the close animation can override it.
    const opacityAfter = overlay.style.opacity;

    // After the fix, cancelDrag (or its caller) restores the overlay to opacity 1 or clears the
    // inline style. Either is acceptable; the dragged 0.x value is not.
    const opacityNum = opacityAfter === '' ? 1 : parseFloat(opacityAfter);
    expect(opacityNum).toBeCloseTo(1, 1);
  });
});
