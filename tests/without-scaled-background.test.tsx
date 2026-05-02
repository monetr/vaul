import { page } from '@rstest/browser';
import { render } from '@rstest/browser-react';
import { beforeEach, describe, expect, test } from '@rstest/core';

import { BaseDrawer } from './fixtures/BaseDrawer';

describe('Without scaled background', () => {
  beforeEach(async () => {
    await render(<BaseDrawer />);
  });

  test('should not scale background', async () => {
    await expect.element(page.locator('[data-vaul-drawer-wrapper]')).not.toHaveCSS('transform', '');
    await page.getByTestId('trigger').click();
    await expect.element(page.getByTestId('content')).toBeVisible();
    await expect.element(page.locator('[data-vaul-drawer-wrapper]')).not.toHaveCSS('transform', '');
  });
});
