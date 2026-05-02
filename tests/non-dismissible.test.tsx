import { page } from '@rstest/browser';
import { render } from '@rstest/browser-react';
import { beforeEach, describe, expect, test } from '@rstest/core';

import { ANIMATION_DURATION } from './constants';
import { NonDismissibleDrawer } from './fixtures/NonDismissibleDrawer';
import { clickOverlay, dragVertically, openDrawer, wait } from './helpers';

describe('Non-dismissible', () => {
  beforeEach(async () => {
    await render(<NonDismissibleDrawer />);
  });

  test('should not close on background interaction', async () => {
    await openDrawer();
    await clickOverlay();
    await wait(ANIMATION_DURATION);
    await expect.element(page.getByTestId('content')).toBeVisible();
  });

  test('should not close when dragged down', async () => {
    await openDrawer();
    await dragVertically(800);
    await wait(ANIMATION_DURATION);
    await expect.element(page.getByTestId('content')).toBeVisible();
  });

  test('should close when the dismiss button is clicked', async () => {
    await openDrawer();
    await page.getByTestId('dismiss-button').click();
    await expect.element(page.getByTestId('content')).not.toBeVisible();
  });
});
