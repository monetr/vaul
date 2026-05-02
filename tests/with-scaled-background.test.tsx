import { page } from '@rstest/browser';
import { render } from '@rstest/browser-react';
import { beforeEach, describe, expect, test } from '@rstest/core';

import { ScaledBackground } from './fixtures/ScaledBackground';
import { dragVerticallyHold, openDrawer, releaseDrag } from './helpers';

describe('With scaled background', () => {
  beforeEach(async () => {
    await render(<ScaledBackground />);
  });

  test('should scale background', async () => {
    await expect.element(page.locator('[data-vaul-drawer-wrapper]')).not.toHaveCSS('transform', '');
    await page.getByTestId('trigger').click();
    await expect.element(page.locator('[data-vaul-drawer-wrapper]')).toHaveCSS('transform', /matrix/);
  });

  test('should scale background when dragging', async () => {
    await expect.element(page.locator('[data-vaul-drawer-wrapper]')).not.toHaveCSS('transform', '');
    await openDrawer();
    await dragVerticallyHold(100);
    await expect.element(page.locator('[data-vaul-drawer-wrapper]')).toHaveCSS('transform', /matrix/);
    await releaseDrag(100);
    await expect.element(page.locator('[data-vaul-drawer-wrapper]')).not.toHaveCSS('transform', '');
  });
});
