import { page } from '@rstest/browser';
import { render } from '@rstest/browser-react';
import { describe, expect, test } from '@rstest/core';

import { RedirectDrawer } from './fixtures/RedirectDrawer';
import { openDrawer } from './helpers';

describe('With redirect', () => {
  test('destination page is scrollable after closing the drawer', async () => {
    await render(<RedirectDrawer />);
    await openDrawer();
    await page.getByTestId('link').click();
    await expect.element(page.getByTestId('content')).toBeAttached();
    await page.getByTestId('content').scrollIntoViewIfNeeded();
    await expect.element(page.getByTestId('content')).toBeInViewport();
  });
});
