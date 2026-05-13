import { page } from '@rstest/browser';
import { render } from '@rstest/browser-react';
import { beforeEach, describe, expect, test } from '@rstest/core';

import { CollidingSnapDrawers } from './fixtures/CollidingSnapDrawers';

// Two non-modal drawers (top + bottom) sharing the snap-point set [0.3, 0.5, 0.7, 0.9]. The
// fixture runs a small negotiator that keeps their combined snap fractions <= 1 by shrinking
// whichever drawer wasn't last touched. When even the loser's smallest snap (0.3) still
// overlaps the winner (e.g. winner at 0.9), the loser pins to 0.3 and z-index alone resolves
// the remaining overlap so the winner paints on top.
describe('Colliding snap drawers', () => {
  beforeEach(async () => {
    await render(<CollidingSnapDrawers />);
  });

  test('non-overlapping snap points leave both drawers untouched', async () => {
    await page.getByTestId('top-trigger').click();
    await page.getByTestId('bottom-trigger').click();
    await expect.element(page.getByTestId('top-content')).toBeVisible();
    await expect.element(page.getByTestId('bottom-content')).toBeVisible();

    // 0.3 + 0.3 = 0.6 so the negotiator does nothing.
    await expect.element(page.getByTestId('top-snap')).toHaveText('0.3');
    await expect.element(page.getByTestId('bottom-snap')).toHaveText('0.3');
  });

  test('growing top forces bottom to shrink to the largest fitting snap', async () => {
    await page.getByTestId('top-trigger').click();
    await page.getByTestId('bottom-trigger').click();
    // Bump bottom first so the next grow on top actually causes a shrink (rather than the
    // loser already sitting at its smallest snap).
    await page.getByTestId('bottom-snap-0.5').click();
    await expect.element(page.getByTestId('bottom-snap')).toHaveText('0.5');

    // 0.7 + 0.5 = 1.2 > 1; bottom shrinks to 0.3 (the largest snap with 0.7 + x <= 1).
    await page.getByTestId('top-snap-0.7').click();
    await expect.element(page.getByTestId('top-snap')).toHaveText('0.7');
    await expect.element(page.getByTestId('bottom-snap')).toHaveText('0.3');
    await expect.element(page.getByTestId('last-interacted')).toHaveText('top');
  });

  test('growing bottom forces top to shrink to the largest fitting snap', async () => {
    await page.getByTestId('top-trigger').click();
    await page.getByTestId('bottom-trigger').click();
    await page.getByTestId('top-snap-0.5').click();
    await expect.element(page.getByTestId('top-snap')).toHaveText('0.5');

    await page.getByTestId('bottom-snap-0.7').click();
    await expect.element(page.getByTestId('bottom-snap')).toHaveText('0.7');
    await expect.element(page.getByTestId('top-snap')).toHaveText('0.3');
    await expect.element(page.getByTestId('last-interacted')).toHaveText('bottom');
  });

  test('winner keeps higher z-index even when loser cannot avoid overlap', async () => {
    await page.getByTestId('top-trigger').click();
    await page.getByTestId('bottom-trigger').click();
    // Force a no-fit case: with winner at 0.9 the loser's smallest snap (0.3) still pushes the
    // sum to 1.2. The loser pins to 0.3 and z-index has to do the rest.
    await page.getByTestId('top-snap-0.9').click();
    await expect.element(page.getByTestId('top-snap')).toHaveText('0.9');
    await expect.element(page.getByTestId('bottom-snap')).toHaveText('0.3');
    await expect.element(page.getByTestId('top-z')).toHaveText('20');
    await expect.element(page.getByTestId('bottom-z')).toHaveText('10');

    // Flipping recency flips the stacking.
    await page.getByTestId('bottom-snap-0.5').click();
    await expect.element(page.getByTestId('top-z')).toHaveText('10');
    await expect.element(page.getByTestId('bottom-z')).toHaveText('20');
  });

  test('opening a drawer marks it as the most recently interacted', async () => {
    await page.getByTestId('top-trigger').click();
    await expect.element(page.getByTestId('last-interacted')).toHaveText('top');
    await page.getByTestId('bottom-trigger').click();
    await expect.element(page.getByTestId('last-interacted')).toHaveText('bottom');
  });
});
