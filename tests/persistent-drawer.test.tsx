import { page } from '@rstest/browser';
import { render } from '@rstest/browser-react';
import { afterEach, beforeEach, describe, expect, test } from '@rstest/core';

import { ANIMATION_DURATION } from './constants';
import { PersistentDrawer } from './fixtures/PersistentDrawer';
import { dragVertically, wait } from './helpers';

// A "persistent peek bar" drawer: defaultOpen + dismissible=false + modal=false + snapPoints + handle. Renders on
// mount, can expand via the handle, can't be dismissed by drag, and leaves the main page fully interactive and
// scrollable since modal is off.
describe('Persistent non-dismissible non-modal snap drawer with handle', () => {
  beforeEach(async () => {
    await render(<PersistentDrawer />);
  });

  afterEach(() => {
    window.scrollTo(0, 0);
  });

  test('is visible on mount without any user interaction', async () => {
    await expect.element(page.getByTestId('content')).toBeVisible();
    await expect.element(page.getByTestId('handle')).toBeVisible();
    await expect.element(page.getByTestId('active-snap-index')).toHaveText('0');
  });

  test('renders no overlay since modal is false', async () => {
    // Drawer.Overlay returns null when modal=false, so the overlay element should not exist.
    await expect.element(page.getByTestId('content')).toBeVisible();
    expect(document.querySelector('[data-testid="overlay"]')).toBeNull();
    expect(document.querySelector('[data-vaul-overlay]')).toBeNull();
  });

  test('main page button stays clickable while drawer is open', async () => {
    await expect.element(page.getByTestId('content')).toBeVisible();
    await expect.element(page.getByTestId('bg-clicks')).toHaveText('0');

    await page.getByTestId('bg-button-top').click();
    await page.getByTestId('bg-button-top').click();

    await expect.element(page.getByTestId('bg-clicks')).toHaveText('2');
  });

  test('main page is scrollable while drawer is open', async () => {
    await expect.element(page.getByTestId('content')).toBeVisible();

    // modal=false means usePreventScroll is disabled and no Overlay is rendered to lock scroll, so document.body should
    // not be position:fixed and window.scrollTo should move the page.
    expect(document.body.style.position).not.toBe('fixed');

    expect(window.scrollY).toBe(0);
    window.scrollTo(0, 600);
    // Yield so the browser commits the scroll before reading scrollY.
    await wait(50);
    expect(window.scrollY).toBeGreaterThan(0);
  });

  test('background content can be scrolled all the way to the bottom', async () => {
    await expect.element(page.getByTestId('content')).toBeVisible();

    const lastItem = document.querySelector<HTMLElement>('[data-testid="last-item"]');
    if (!lastItem) {
      throw new Error('last-item not in the DOM');
    }
    // The list ends below the fold, so the last item starts off-screen.
    expect(lastItem.getBoundingClientRect().top).toBeGreaterThan(window.innerHeight);

    window.scrollTo(0, document.documentElement.scrollHeight);
    await wait(50);

    // After scrolling to the bottom, the last item is in the viewport. The fixture pads the page
    // by the peek height (148px), so the item lands above the bar rather than under it.
    const rect = lastItem.getBoundingClientRect();
    expect(rect.top).toBeGreaterThanOrEqual(0);
    expect(rect.bottom).toBeLessThanOrEqual(window.innerHeight);
  });

  test('clicking handle expands to the next snap point', async () => {
    await expect.element(page.getByTestId('active-snap-index')).toHaveText('0');
    await page.getByTestId('handle').click();
    await expect.element(page.getByTestId('active-snap-index')).toHaveText('1');
  });

  test('cannot be dismissed by dragging down', async () => {
    await expect.element(page.getByTestId('content')).toBeVisible();
    // shouldDrag() suppresses dragging for 500ms after open. openDrawer() handles this for the trigger flow, but
    // defaultOpen never calls openDrawer, so wait it out manually.
    await wait(500);
    await dragVertically(800);
    await wait(ANIMATION_DURATION);
    await expect.element(page.getByTestId('content')).toBeVisible();
    // Still parked at the smallest snap point, didn't fall off.
    await expect.element(page.getByTestId('active-snap-index')).toHaveText('0');
  });

  test('dragging down from the expanded snap point snaps back instead of closing', async () => {
    // Expand to the larger snap point first so the drag has somewhere to fall before it would hit the dismiss path on a
    // regular dismissible drawer.
    await page.getByTestId('handle').click();
    await expect.element(page.getByTestId('active-snap-index')).toHaveText('1');
    await wait(ANIMATION_DURATION);

    await dragVertically(1200);
    await wait(ANIMATION_DURATION);

    // dismissible=false means the drawer must remain mounted and snap back to index 0, not close.
    await expect.element(page.getByTestId('content')).toBeVisible();
    await expect.element(page.getByTestId('active-snap-index')).toHaveText('0');
  });
});
