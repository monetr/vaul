import { page } from '@rstest/browser';
import { render } from '@rstest/browser-react';
import { beforeEach, describe, expect, test } from '@rstest/core';

import { HandleDrawer } from './fixtures/HandleDrawer';

describe('With handle', () => {
  beforeEach(async () => {
    await render(<HandleDrawer />);
  });

  // Drawer.Handle's onClick schedules setActiveSnapPoint via setTimeout
  // (LONG_HANDLE_PRESS_TIMEOUT = 250ms in src/index.tsx). expect.element auto-retries
  // up to testTimeout, so this works without an explicit wait.
  test('click should cycle to the next snap point', async () => {
    await expect.element(page.getByTestId('content')).toBeVisible();
    await expect.element(page.getByTestId('active-snap-index')).toHaveText('0');
    await page.getByTestId('handle').click();
    await expect.element(page.getByTestId('active-snap-index')).toHaveText('1');
  });
});
