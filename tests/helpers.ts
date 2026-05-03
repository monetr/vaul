import { page } from '@rstest/browser';
import { expect } from '@rstest/core';

export async function openDrawer() {
  await expect.element(page.getByTestId('content')).not.toBeVisible();
  await page.getByTestId('trigger').click();
  await expect.element(page.getByTestId('content')).toBeVisible();
  // Vaul's shouldDrag() suppresses dragging for 500ms after open ("Allow scrolling when
  // animating" branch). Wait it out so subsequent dragVertically() calls aren't no-ops.
  await wait(500);
}

type DragOpts = { steps?: number; pointerType?: 'mouse' | 'touch'; targetSelector?: string };

function getDrawer(selector = '[data-vaul-drawer]'): HTMLElement {
  const target = document.querySelector<HTMLElement>(selector);
  if (!target) {
    throw new Error(`No element matching ${selector} in the DOM`);
  }
  // Root's onPress calls setPointerCapture(event.pointerId). Synthetic PointerEvents have a
  // pointerId the browser never observed, so Chromium throws InvalidPointerId. Stub the capture
  // APIs to no-ops on the drawer element and its descendants; local to tests, doesn't change
  // library behavior.
  for (const el of [target, ...Array.from(target.querySelectorAll<HTMLElement>('*'))]) {
    el.setPointerCapture = () => {};
    el.releasePointerCapture = () => {};
    el.hasPointerCapture = () => false;
  }
  return target;
}

function fire(target: HTMLElement, type: string, x: number, y: number, pointerType: 'mouse' | 'touch') {
  return target.dispatchEvent(
    new PointerEvent(type, {
      bubbles: true,
      cancelable: true,
      composed: true,
      pointerId: 1,
      pointerType,
      isPrimary: true,
      button: 0,
      buttons: type === 'pointerup' ? 0 : 1,
      clientX: x,
      clientY: y,
    }),
  );
}

// Yield to the event loop so React can commit the setIsDragging(true) state update from onPointerDown before our
// subsequent pointermove events arrive. Without this yield, onDrag short-circuits on the stale isDragging=false state.
const tick = () => new Promise(r => setTimeout(r, 16));

export async function dragVertically(deltaY: number, opts: DragOpts = {}) {
  const steps = opts.steps ?? 8;
  const pointerType = opts.pointerType ?? 'touch';
  const target = getDrawer(opts.targetSelector);
  const rect = target.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + 20;

  fire(target, 'pointerdown', startX, startY, pointerType);
  await tick();
  for (let i = 1; i <= steps; i++) {
    fire(target, 'pointermove', startX, startY + (deltaY * i) / steps, pointerType);
    await tick();
  }
  fire(target, 'pointerup', startX, startY + deltaY, pointerType);
}

export async function dragVerticallyHold(deltaY: number, opts: DragOpts = {}) {
  const steps = opts.steps ?? 8;
  const pointerType = opts.pointerType ?? 'touch';
  const target = getDrawer();
  const rect = target.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + 20;

  fire(target, 'pointerdown', startX, startY, pointerType);
  await tick();
  for (let i = 1; i <= steps; i++) {
    fire(target, 'pointermove', startX, startY + (deltaY * i) / steps, pointerType);
    await tick();
  }
}

export async function dragHorizontally(deltaX: number, opts: DragOpts = {}) {
  const steps = opts.steps ?? 8;
  const pointerType = opts.pointerType ?? 'touch';
  const target = getDrawer();
  const rect = target.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;

  fire(target, 'pointerdown', startX, startY, pointerType);
  await tick();
  for (let i = 1; i <= steps; i++) {
    fire(target, 'pointermove', startX + (deltaX * i) / steps, startY, pointerType);
    await tick();
  }
  fire(target, 'pointerup', startX + deltaX, startY, pointerType);
}

export async function releaseDrag(deltaY: number, opts: DragOpts = {}) {
  const pointerType = opts.pointerType ?? 'touch';
  const target = document.querySelector<HTMLElement>('[data-vaul-drawer]');
  if (!target) {
    return;
  }
  const rect = target.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + 20;
  fire(target, 'pointerup', startX, startY + deltaY, pointerType);
}

/**
 * Click the overlay near its top-left corner. The overlay is full-screen but the drawer content covers most of it;
 * clicking the overlay's center hits the drawer instead. This mirrors the original Playwright `mouse.click(0, 0)`.
 */
export async function clickOverlay(testId = 'overlay') {
  await page.getByTestId(testId).click({ position: { x: 5, y: 5 } });
}

export async function cancelDrag() {
  const target = document.querySelector<HTMLElement>('[data-vaul-drawer]');
  target?.dispatchEvent(new Event('contextmenu', { bubbles: true }));
}

export const wait = (ms: number) => new Promise(r => setTimeout(r, ms));
