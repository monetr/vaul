import { page } from '@rstest/browser';
import { render } from '@rstest/browser-react';
import { describe, expect, test } from '@rstest/core';

import { ANIMATION_DURATION } from './constants';
import { DirectionalDrawer } from './fixtures/DirectionalDrawer';
import { dragHorizontally, dragVertically, openDrawer, wait } from './helpers';

// For each non-default direction, verify the basic open/close lifecycle and that
// drag-to-close honors the direction's close axis. (Default `bottom` is covered
// extensively in base.test.tsx.)
//
// vaul (src/index.tsx onRelease):
//   - Drag in the *open* direction (away from closed) -> resetDrawer, stays open.
//   - Drag in the *close* direction with velocity > 0.4 OR distance >= drawerDim * 0.25 -> closeDrawer.
//
// Close direction per drawer:
//   top    -> drag up   (negative deltaY)
//   left   -> drag left (negative deltaX)
//   right  -> drag right (positive deltaX)

describe('direction=top', () => {
  test('opens via trigger and closes via Drawer.Close', async () => {
    await render(<DirectionalDrawer direction='top' />);
    await expect.element(page.getByTestId('content')).not.toBeVisible();
    await page.getByTestId('trigger').click();
    await expect.element(page.getByTestId('content')).toBeVisible();
    await page.getByTestId('drawer-close').click();
    await expect.element(page.getByTestId('content')).not.toBeVisible();
  });

  test('closes when dragged up', async () => {
    await render(<DirectionalDrawer direction='top' />);
    await openDrawer();
    await dragVertically(-300);
    await expect.element(page.getByTestId('content')).not.toBeVisible();
  });

  test('stays open when dragged down (open direction)', async () => {
    await render(<DirectionalDrawer direction='top' />);
    await openDrawer();
    await dragVertically(300);
    await wait(ANIMATION_DURATION);
    await expect.element(page.getByTestId('content')).toBeVisible();
  });
});

describe('direction=left', () => {
  test('opens via trigger and closes via Drawer.Close', async () => {
    await render(<DirectionalDrawer direction='left' />);
    await expect.element(page.getByTestId('content')).not.toBeVisible();
    await page.getByTestId('trigger').click();
    await expect.element(page.getByTestId('content')).toBeVisible();
    await page.getByTestId('drawer-close').click();
    await expect.element(page.getByTestId('content')).not.toBeVisible();
  });

  test('closes when dragged left', async () => {
    await render(<DirectionalDrawer direction='left' />);
    await openDrawer();
    await dragHorizontally(-150);
    await expect.element(page.getByTestId('content')).not.toBeVisible();
  });

  test('stays open when dragged right (open direction)', async () => {
    await render(<DirectionalDrawer direction='left' />);
    await openDrawer();
    await dragHorizontally(150);
    await wait(ANIMATION_DURATION);
    await expect.element(page.getByTestId('content')).toBeVisible();
  });
});

describe('direction=right', () => {
  test('opens via trigger and closes via Drawer.Close', async () => {
    await render(<DirectionalDrawer direction='right' />);
    await expect.element(page.getByTestId('content')).not.toBeVisible();
    await page.getByTestId('trigger').click();
    await expect.element(page.getByTestId('content')).toBeVisible();
    await page.getByTestId('drawer-close').click();
    await expect.element(page.getByTestId('content')).not.toBeVisible();
  });

  test('closes when dragged right', async () => {
    await render(<DirectionalDrawer direction='right' />);
    await openDrawer();
    await dragHorizontally(150);
    await expect.element(page.getByTestId('content')).not.toBeVisible();
  });

  test('stays open when dragged left (open direction)', async () => {
    await render(<DirectionalDrawer direction='right' />);
    await openDrawer();
    await dragHorizontally(-150);
    await wait(ANIMATION_DURATION);
    await expect.element(page.getByTestId('content')).toBeVisible();
  });
});
