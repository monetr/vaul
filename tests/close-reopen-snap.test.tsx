import { render } from '@rstest/browser-react';
import { describe, expect, test } from '@rstest/core';

import { SnapToggleDrawer } from './fixtures/SnapToggleDrawer';
import { dragVertically, wait } from './helpers';

// closeDrawer schedules `setTimeout(() => setActiveSnapPoint(snapPoints[0]), 500)` with no cleanup. After a drag-close,
// even if the drawer never visually closes (open prop hardcoded), the stale timer fires and overwrites a later
// setActiveSnapPoint to a different value.
describe('closeDrawer stale timer', () => {
  function clickById(testId: string) {
    const el = document.querySelector<HTMLElement>(`[data-testid="${testId}"]`);
    if (!el) {
      throw new Error(`No element with data-testid="${testId}"`);
    }
    el.click();
  }

  test('user-set active snap is not overwritten by the stale 500ms timer from a prior close', async () => {
    await render(<SnapToggleDrawer />);
    await wait(500);

    const indexEl = document.querySelector<HTMLElement>('[data-testid="active-snap-index"]');
    expect(indexEl?.textContent).toBe('1');

    // Hard drag down at index 1 -> useSnapPoints.onRelease (velocity > 2, dismissible) -> closeDrawer() -> schedules
    // stale timer at +500ms to set snap to snapPoints[0] (which is 0 in this fixture).
    await dragVertically(800);

    // Within 50ms (well before 500ms), reassert snap=2. With the bug, the stale timer fires at
    // +500ms and silently overrides to index 0.
    clickById('set-snap-2');
    await wait(50);
    expect(indexEl?.textContent).toBe('2');

    // Wait past the stale timer.
    await wait(800);

    // After fix: timer cleared on subsequent setActiveSnapPoint. snap stays at 2.
    // Without fix: timer fires, snap goes to 0.
    expect(indexEl?.textContent).toBe('2');
  });
});
