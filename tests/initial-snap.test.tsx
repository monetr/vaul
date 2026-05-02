import { page } from '@rstest/browser';
import { render } from '@rstest/browser-react';
import { beforeEach, describe, expect, test } from '@rstest/core';

import { InitialSnapDrawer } from './fixtures/InitialSnapDrawer';

describe('Initial-snap', () => {
  beforeEach(async () => {
    await render(<InitialSnapDrawer />);
  });

  test('should be open and snapped on initial load', async () => {
    await expect.element(page.getByTestId('content')).toBeVisible();
    await expect.element(page.getByTestId('active-snap-index')).toHaveText('1');
  });
});
