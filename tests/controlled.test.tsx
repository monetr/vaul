import { page } from '@rstest/browser';
import { render } from '@rstest/browser-react';
import { beforeEach, describe, expect, test } from '@rstest/core';

import { ControlledDrawer } from './fixtures/ControlledDrawer';
import { clickOverlay } from './helpers';

describe('Controlled', () => {
  beforeEach(async () => {
    await render(<ControlledDrawer />);
  });

  test('should not close when clicked on overlay and only the open prop is passed', async () => {
    await expect.element(page.getByTestId('content')).not.toBeVisible();
    await page.getByTestId('trigger').click();
    await expect.element(page.getByTestId('content')).toBeVisible();
    await clickOverlay();
    await expect.element(page.getByTestId('content')).toBeVisible();
  });

  test('should close when clicked on overlay and open and onOpenChange props are passed', async () => {
    await expect.element(page.getByTestId('fully-controlled-content')).not.toBeVisible();
    await page.getByTestId('fully-controlled-trigger').click();
    await expect.element(page.getByTestId('fully-controlled-content')).toBeVisible();
    await clickOverlay('fully-controlled-overlay');
    await expect.element(page.getByTestId('fully-controlled-content')).not.toBeVisible();
  });
});
