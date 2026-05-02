import { page } from '@rstest/browser';
import { render } from '@rstest/browser-react';
import { beforeEach, describe, expect, test } from '@rstest/core';

import { InitialSnapDrawer } from './fixtures/InitialSnapDrawer';
import { dragVertically, wait } from './helpers';

// Snap points: [0, '148px', '355px', 1]; initial index = 1.
// Vaul's `shouldDrag()` suppresses dragging for 500ms after open (src/index.tsx:316),
// so each drag test waits that out before dispatching pointer events.
//
// Velocity thresholds (use-snap-points.ts:onRelease):
//   velocity > 2  + drag up   -> snap to last  (index 3)
//   velocity > 2  + drag down -> closeDrawer() (eventually setActiveSnapPoint(0))
//   velocity > 0.4, distance < 40% viewport -> snap to adjacent index in drag direction
//
// Our dragVertically helper runs 8 steps * ~16ms tick = ~144ms total. So:
//   200px  -> velocity ~1.4 (moderate, adjacent)
//   800px  -> velocity ~5.5 (fast)
describe('Initial-snap', () => {
  beforeEach(async () => {
    await render(<InitialSnapDrawer />);
  });

  test('should be open and snapped on initial load', async () => {
    await expect.element(page.getByTestId('content')).toBeVisible();
    await expect.element(page.getByTestId('active-snap-index')).toHaveText('1');
  });

  test('should snap to next snap point when dragged up', async () => {
    await wait(500);
    await dragVertically(-200);
    await expect.element(page.getByTestId('active-snap-index')).toHaveText('2');
  });

  test('should snap to last snap point when dragged up fast', async () => {
    await wait(500);
    await dragVertically(-800);
    await expect.element(page.getByTestId('active-snap-index')).toHaveText('3');
  });

  test('should snap to 0 when dragged down', async () => {
    await wait(500);
    await dragVertically(800);
    await expect.element(page.getByTestId('active-snap-index')).toHaveText('0');
  });
});
