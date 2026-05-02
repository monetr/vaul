import { page } from '@rstest/browser';
import { render } from '@rstest/browser-react';
import { beforeEach, describe, expect, test } from '@rstest/core';

import { ANIMATION_DURATION } from './constants';
import { BaseDrawer } from './fixtures/BaseDrawer';
import { cancelDrag, clickOverlay, dragVertically, dragVerticallyHold, openDrawer, wait } from './helpers';

describe('Base tests', () => {
  beforeEach(async () => {
    await render(<BaseDrawer />);
  });

  test('should open drawer', async () => {
    await expect.element(page.getByTestId('content')).not.toBeVisible();
    await page.getByTestId('trigger').click();
    await expect.element(page.getByTestId('content')).toBeVisible();
  });

  test('should close on background interaction', async () => {
    await openDrawer();
    await clickOverlay();
    await expect.element(page.getByTestId('content')).not.toBeVisible();
  });

  test('should close when `Drawer.Close` is clicked', async () => {
    await openDrawer();
    await page.getByTestId('drawer-close').click();
    await expect.element(page.getByTestId('content')).not.toBeVisible();
  });

  test('should close when controlled', async () => {
    await openDrawer();
    await page.getByTestId('controlled-close').click();
    await expect.element(page.getByTestId('content')).not.toBeVisible();
  });

  test('should close when dragged down', async () => {
    await openDrawer();
    await dragVertically(800);
    await expect.element(page.getByTestId('content')).not.toBeVisible();
  });

  test('should not close when dragged up', async () => {
    await openDrawer();
    await dragVertically(-800);
    await wait(ANIMATION_DURATION);
    await expect.element(page.getByTestId('content')).toBeVisible();
  });
});

test('should be open by default when defaultOpen is true', async () => {
  await render(<BaseDrawer defaultOpen />);
  await expect.element(page.getByTestId('content')).toBeVisible();
});

test('should close when dragged down and cancelled', async () => {
  await render(<BaseDrawer />);
  await openDrawer();
  await dragVerticallyHold(800);
  await cancelDrag();
  await wait(ANIMATION_DURATION);
  await expect.element(page.getByTestId('content')).not.toBeVisible();
});
