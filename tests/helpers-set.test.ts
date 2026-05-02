import { afterEach, describe, expect, test } from '@rstest/core';

import { assignStyle, reset, set } from '../src/helpers';

let mounted: HTMLElement[] = [];
function newEl() {
  const el = document.createElement('div');
  document.body.appendChild(el);
  mounted.push(el);
  return el;
}

afterEach(() => {
  for (const el of mounted) el.remove();
  mounted = [];
});

describe('helpers.set / reset', () => {
  // Bug D: each non-ignoreCache call to set() overwrites the cache snapshot, so reset() only
  // restores the most recent call's "previous" values. Sequential set calls lose earlier originals.
  test('reset() restores originals from sequential set() calls', () => {
    const el = newEl();
    el.style.color = 'red';
    el.style.background = 'blue';

    set(el, { color: 'green' });
    set(el, { background: 'yellow' });
    reset(el);

    expect(el.style.color).toBe('red');
    expect(el.style.background).toBe('blue');
  });
});

describe('helpers.assignStyle interaction with set()', () => {
  // Bug O: assignStyle snapshots full cssText on entry, then on cleanup writes prevStyle back,
  // wiping any inline styles that set() applied in between.
  test('assignStyle cleanup does not wipe later set() writes', () => {
    const el = newEl();
    el.style.color = 'red';

    const cleanup = assignStyle(el, { background: 'blue' });
    set(el, { color: 'green' });
    cleanup();

    expect(el.style.color).toBe('green');
  });
});
