import { page } from '@rstest/browser';
import { render } from '@rstest/browser-react';
import { beforeEach, describe, expect, test } from '@rstest/core';

import { NonDismissibleHandleDrawer } from './fixtures/NonDismissibleHandleDrawer';
import { wait } from './helpers';

// When the handle is clicked at the last snap point on a non-dismissible drawer, the
// `if (isLastSnapPoint && dismissible)` early-return inside Handle's handleCycleSnapPoints is
// skipped. Code falls through to `nextSnapPoint = snapPoints[currentSnapIndex + 1]` (undefined)
// and calls setActiveSnapPoint(undefined), which makes snapPoints.indexOf(undefined) return -1.
describe('Handle cycle on non-dismissible drawer', () => {
  beforeEach(async () => {
    await render(<NonDismissibleHandleDrawer />);
  });

  test('clicking handle at last snap point keeps last snap, does not set undefined', async () => {
    await expect.element(page.getByTestId('active-snap-index')).toHaveText('0');

    await page.getByTestId('handle').click();
    await expect.element(page.getByTestId('active-snap-index')).toHaveText('1');

    await page.getByTestId('handle').click();
    // DOUBLE_TAP_TIMEOUT (120ms) plus a comfortable margin so handleCycleSnapPoints fires.
    await wait(300);

    // Read the rendered value directly once. Using expect.element here would auto-retry until
    // testTimeout, masking the bug as a timeout instead of an assertion mismatch.
    const indexEl = document.querySelector<HTMLElement>('[data-testid="active-snap-index"]');
    expect(indexEl?.textContent).toBe('1');
  });
});
