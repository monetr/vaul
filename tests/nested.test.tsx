import { page } from '@rstest/browser';
import { render } from '@rstest/browser-react';
import { beforeEach, describe, expect, test } from '@rstest/core';

import { NestedDrawers } from './fixtures/NestedDrawers';
import { openDrawer } from './helpers';

describe('Nested tests', () => {
  beforeEach(async () => {
    await render(<NestedDrawers />);
  });

  test('should open and close nested drawer', async () => {
    await openDrawer();
    await page.getByTestId('nested-trigger').click();
    await expect.element(page.getByTestId('nested-content')).toBeVisible();
    await page.getByTestId('nested-close').click();
    await expect.element(page.getByTestId('nested-content')).not.toBeVisible();
    await expect.element(page.getByTestId('content')).toBeVisible();
  });
});
