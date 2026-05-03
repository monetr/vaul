import { page } from '@rstest/browser';
import { render } from '@rstest/browser-react';
import { beforeEach, describe, expect, test } from '@rstest/core';

import { ANIMATION_DURATION } from './constants';
import { TwoDrawers } from './fixtures/TwoDrawers';
import { dragVertically, wait } from './helpers';

// Two side-by-side, non-nested, non-modal Drawer.Roots (one anchored top, one anchored bottom). Verify they open/close
// independently, can be open simultaneously, and don't lock the page.
describe('Two non-nested non-modal drawers', () => {
  beforeEach(async () => {
    await render(<TwoDrawers />);
  });

  test('top drawer opens via its trigger and closes via its close button', async () => {
    await expect.element(page.getByTestId('top-content')).not.toBeVisible();
    await page.getByTestId('top-trigger').click();
    await expect.element(page.getByTestId('top-content')).toBeVisible();
    await page.getByTestId('top-close').click();
    await expect.element(page.getByTestId('top-content')).not.toBeVisible();
  });

  test('bottom drawer opens via its trigger and closes via its close button', async () => {
    await expect.element(page.getByTestId('bottom-content')).not.toBeVisible();
    await page.getByTestId('bottom-trigger').click();
    await expect.element(page.getByTestId('bottom-content')).toBeVisible();
    await page.getByTestId('bottom-close').click();
    await expect.element(page.getByTestId('bottom-content')).not.toBeVisible();
  });

  test('both drawers can be open at the same time', async () => {
    await page.getByTestId('top-trigger').click();
    await expect.element(page.getByTestId('top-content')).toBeVisible();
    await page.getByTestId('bottom-trigger').click();
    await expect.element(page.getByTestId('bottom-content')).toBeVisible();
    // Reading both states confirms neither sibling auto-closed when the other opened.
    await expect.element(page.getByTestId('top-content')).toBeVisible();
    await expect.element(page.getByTestId('bottom-content')).toBeVisible();
  });

  test('closing one open drawer leaves the other open', async () => {
    await page.getByTestId('top-trigger').click();
    await page.getByTestId('bottom-trigger').click();
    await expect.element(page.getByTestId('top-content')).toBeVisible();
    await expect.element(page.getByTestId('bottom-content')).toBeVisible();

    await page.getByTestId('top-close').click();
    await expect.element(page.getByTestId('top-content')).not.toBeVisible();
    await expect.element(page.getByTestId('bottom-content')).toBeVisible();
  });

  test('bottom drawer closes when dragged down without affecting the top drawer', async () => {
    await page.getByTestId('top-trigger').click();
    await page.getByTestId('bottom-trigger').click();
    await expect.element(page.getByTestId('top-content')).toBeVisible();
    await expect.element(page.getByTestId('bottom-content')).toBeVisible();
    // shouldDrag() suppresses dragging for 500ms after open, so wait it out.
    await wait(500);

    await dragVertically(800, { targetSelector: '[data-vaul-drawer-direction="bottom"]' });
    await wait(ANIMATION_DURATION);

    await expect.element(page.getByTestId('bottom-content')).not.toBeVisible();
    await expect.element(page.getByTestId('top-content')).toBeVisible();
  });

  test('top drawer closes when dragged up without affecting the bottom drawer', async () => {
    await page.getByTestId('top-trigger').click();
    await page.getByTestId('bottom-trigger').click();
    await expect.element(page.getByTestId('top-content')).toBeVisible();
    await expect.element(page.getByTestId('bottom-content')).toBeVisible();
    await wait(500);

    await dragVertically(-300, { targetSelector: '[data-vaul-drawer-direction="top"]' });
    await wait(ANIMATION_DURATION);

    await expect.element(page.getByTestId('top-content')).not.toBeVisible();
    await expect.element(page.getByTestId('bottom-content')).toBeVisible();
  });

  test('background button stays clickable with both drawers open since neither is modal', async () => {
    await page.getByTestId('top-trigger').click();
    await page.getByTestId('bottom-trigger').click();
    await expect.element(page.getByTestId('top-content')).toBeVisible();
    await expect.element(page.getByTestId('bottom-content')).toBeVisible();
    await expect.element(page.getByTestId('bg-clicks')).toHaveText('0');

    await page.getByTestId('bg-button').click();
    await page.getByTestId('bg-button').click();

    await expect.element(page.getByTestId('bg-clicks')).toHaveText('2');
  });

  test('neither drawer renders an overlay (modal=false on both)', async () => {
    await page.getByTestId('top-trigger').click();
    await page.getByTestId('bottom-trigger').click();
    await expect.element(page.getByTestId('top-content')).toBeVisible();
    await expect.element(page.getByTestId('bottom-content')).toBeVisible();

    expect(document.querySelector('[data-testid="top-overlay"]')).toBeNull();
    expect(document.querySelector('[data-testid="bottom-overlay"]')).toBeNull();
    expect(document.querySelector('[data-vaul-overlay]')).toBeNull();
  });
});
