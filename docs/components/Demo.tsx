import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { forwardRef } from 'react';

import type { DrawerDirection } from '@monetr/vaul';

interface DemoProps {
  children: ReactNode;
  minHeight?: number;
}

// data-vaul-drawer-wrapper is intentionally NOT set here. Each demo that uses
// shouldScaleBackground supplies its own wrapper so the scale effect is scoped
// to that demo rather than the first demo card on the page.
export function Demo({ children, minHeight = 80 }: DemoProps) {
  return (
    <div
      style={{
        position: 'relative',
        padding: '24px',
        marginTop: '16px',
        marginBottom: '16px',
        border: '1px solid var(--rp-c-divider)',
        borderRadius: '12px',
        background: 'var(--rp-c-bg-soft)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        alignItems: 'center',
        minHeight: `${minHeight}px`,
      }}
    >
      {children}
    </div>
  );
}

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'type'> {
  accent?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, accent, disabled, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      {...rest}
      disabled={disabled}
      style={{
        padding: '8px 14px',
        borderRadius: '8px',
        border: `1px solid ${accent ?? 'var(--rp-c-divider)'}`,
        background: 'transparent',
        color: accent ?? 'var(--rp-c-text-1)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'inherit',
        fontSize: '14px',
        lineHeight: '20px',
        fontWeight: 600,
        opacity: disabled ? 0.5 : 1,
      }}
      type='button'
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

// Drawers portal to document.body and render at viewport scope. We supply
// the layout CSS the library does not ship (it only ships animations and the
// snap-point transform machinery). rspress's chrome (header, hover menus) goes
// up to z-999, so the drawer needs to sit above that.
export const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.45)',
  zIndex: 1000,
};

export function getDrawerStyle(direction: DrawerDirection): CSSProperties {
  // Integer line-height on the drawer keeps children from picking up subpixel
  // intrinsic heights. The library applies will-change: transform, which puts
  // the drawer on a GPU compositor layer; if the layer ends up at a fractional
  // viewport position the browser bilinear-filters the text and buttons.
  const base: CSSProperties = {
    position: 'fixed',
    background: 'var(--rp-c-bg)',
    border: '1px solid var(--rp-c-divider)',
    boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.18)',
    color: 'var(--rp-c-text-1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '20px',
    boxSizing: 'border-box',
    zIndex: 1001,
    outline: 'none',
    fontSize: '14px',
    lineHeight: '20px',
  };

  if (direction === 'bottom') {
    return { ...base, left: 0, right: 0, bottom: 0, maxHeight: '85vh', borderRadius: '12px 12px 0 0' };
  }
  if (direction === 'top') {
    return { ...base, left: 0, right: 0, top: 0, maxHeight: '85vh', borderRadius: '0 0 12px 12px' };
  }
  if (direction === 'right') {
    return { ...base, top: 0, bottom: 0, right: 0, width: '85vw', maxWidth: '400px', borderRadius: '12px 0 0 12px' };
  }
  return { ...base, top: 0, bottom: 0, left: 0, width: '85vw', maxWidth: '400px', borderRadius: '0 12px 12px 0' };
}

// Snap-point drawers translate by `window.innerHeight - snapPx` down from the
// drawer's natural top. For that math to leave exactly the snap-px portion
// visible the drawer must fill the viewport when un-translated, so we drop the
// max-height cap that the regular drawer uses.
export function getSnapDrawerStyle(direction: DrawerDirection = 'bottom'): CSSProperties {
  const base = getDrawerStyle(direction);
  if (direction === 'left' || direction === 'right') {
    return { ...base, width: '100%', maxWidth: 'none' };
  }
  return { ...base, height: '100%', maxHeight: 'none' };
}

export const visuallyHidden: CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  border: 0,
};
