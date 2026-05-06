import { afterEach, describe, expect, test } from '@rstest/core';

import { assignStyle, camelToKebab, reset, set } from '../src/helpers';

let mounted: HTMLElement[] = [];
function newEl() {
  const el = document.createElement('div');
  document.body.appendChild(el);
  mounted.push(el);
  return el;
}

afterEach(() => {
  for (const el of mounted) {
    el.remove();
  }
  mounted = [];
});

describe('camelToKebab', () => {
  test('passes through single-word lowercase', () => {
    expect(camelToKebab('color')).toBe('color');
    expect(camelToKebab('opacity')).toBe('opacity');
    expect(camelToKebab('transform')).toBe('transform');
  });

  test('converts two-segment camelCase', () => {
    expect(camelToKebab('borderRadius')).toBe('border-radius');
    expect(camelToKebab('transformOrigin')).toBe('transform-origin');
    expect(camelToKebab('backgroundColor')).toBe('background-color');
    expect(camelToKebab('scrollBehavior')).toBe('scroll-behavior');
  });

  test('converts multi-segment camelCase', () => {
    expect(camelToKebab('transitionTimingFunction')).toBe('transition-timing-function');
    expect(camelToKebab('borderTopLeftRadius')).toBe('border-top-left-radius');
  });

  test('passes through already-kebab keys unchanged', () => {
    expect(camelToKebab('border-radius')).toBe('border-radius');
    expect(camelToKebab('transition-timing-function')).toBe('transition-timing-function');
  });

  test('preserves CSS custom properties even when they contain capitals', () => {
    expect(camelToKebab('--my-color')).toBe('--my-color');
    expect(camelToKebab('--myColor')).toBe('--myColor');
    expect(camelToKebab('--')).toBe('--');
  });

  test('handles empty string', () => {
    expect(camelToKebab('')).toBe('');
  });
});

describe('helpers.set / reset', () => {
  // Each non-ignoreCache call to set() overwrites the cache snapshot, so reset() only restores
  // the most recent call's "previous" values. Sequential set calls lose earlier originals.
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

  test('round-trips multi-segment camelCase keys', () => {
    const el = newEl();
    el.style.borderRadius = '4px';
    el.style.transformOrigin = '10px 20px';
    el.style.transitionTimingFunction = 'ease-in';

    set(el, {
      borderRadius: '12px',
      transformOrigin: '30px 40px',
      transitionTimingFunction: 'ease-out',
    });
    expect(el.style.borderRadius).toBe('12px');
    expect(el.style.transformOrigin).toBe('30px 40px');
    expect(el.style.transitionTimingFunction).toBe('ease-out');

    reset(el);
    expect(el.style.borderRadius).toBe('4px');
    expect(el.style.transformOrigin).toBe('10px 20px');
    expect(el.style.transitionTimingFunction).toBe('ease-in');
  });

  test('clears properties that had no prior inline value', () => {
    const el = newEl();
    // No initial inline transform.
    set(el, { transform: 'scale(0.9)' });
    expect(el.style.transform).toBe('scale(0.9)');

    reset(el);
    expect(el.style.transform).toBe('');
  });

  // set() applies CSS custom properties but does not snapshot them, so reset() leaves them alone. This has been the
  // library's behavior since before the typed-DOM refactor.
  test('applies CSS custom properties; reset does not restore them', () => {
    const el = newEl();
    el.style.setProperty('--my-color', 'red');

    set(el, { '--my-color': 'green' });
    expect(el.style.getPropertyValue('--my-color')).toBe('green');

    reset(el);
    expect(el.style.getPropertyValue('--my-color')).toBe('green');
  });

  test('reset(el, prop) restores only that one property', () => {
    const el = newEl();
    el.style.color = 'red';
    el.style.background = 'blue';

    set(el, { color: 'green', background: 'yellow' });
    reset(el, 'color');

    expect(el.style.color).toBe('red');
    expect(el.style.background).toBe('yellow');
  });

  test('reset(el, prop) restores camelCase prop names', () => {
    const el = newEl();
    el.style.borderRadius = '4px';

    set(el, { borderRadius: '12px' });
    reset(el, 'borderRadius');

    expect(el.style.borderRadius).toBe('4px');
  });

  // Mixed call applies both, but only the standard property is restored on reset (see the CSS custom property test
  // above for the rationale).
  test('mixed standard + custom property in one set() call', () => {
    const el = newEl();
    el.style.transform = 'scale(1)';
    el.style.setProperty('--accent', 'red');

    set(el, { transform: 'scale(0.95)', '--accent': 'green' });
    expect(el.style.transform).toBe('scale(0.95)');
    expect(el.style.getPropertyValue('--accent')).toBe('green');

    reset(el);
    expect(el.style.transform).toBe('scale(1)');
    expect(el.style.getPropertyValue('--accent')).toBe('green');
  });
});

describe('helpers.assignStyle', () => {
  // assignStyle snapshots full cssText on entry, then on cleanup writes prevStyle back, wiping any inline styles that
  // set() applied in between.
  test('cleanup does not wipe later set() writes', () => {
    const el = newEl();
    el.style.color = 'red';

    const cleanup = assignStyle(el, { background: 'blue' });
    set(el, { color: 'green' });
    cleanup();

    expect(el.style.color).toBe('green');
  });

  test('captures and restores multi-segment camelCase keys', () => {
    const el = newEl();
    el.style.borderRadius = '4px';
    el.style.transformOrigin = '10px 20px';
    el.style.transitionTimingFunction = 'ease-in';

    const cleanup = assignStyle(el, {
      borderRadius: '12px',
      transformOrigin: '30px 40px',
      transitionTimingFunction: 'ease-out',
    });
    expect(el.style.borderRadius).toBe('12px');
    expect(el.style.transformOrigin).toBe('30px 40px');
    expect(el.style.transitionTimingFunction).toBe('ease-out');

    cleanup();
    expect(el.style.borderRadius).toBe('4px');
    expect(el.style.transformOrigin).toBe('10px 20px');
    expect(el.style.transitionTimingFunction).toBe('ease-in');
  });

  test('cleanup clears keys that had no prior inline value', () => {
    const el = newEl();

    const cleanup = assignStyle(el, { transform: 'scale(0.9)' });
    expect(el.style.transform).toBe('scale(0.9)');

    cleanup();
    expect(el.style.transform).toBe('');
  });

  test('handles null element by returning a no-op cleanup', () => {
    const cleanup = assignStyle(null, { transform: 'scale(0.9)' });
    expect(() => cleanup()).not.toThrow();
  });
});
