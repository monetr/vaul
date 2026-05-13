import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

import type { DrawerDirection } from '@monetr/vaul';

import styles from './Demo.module.css';

export { styles as demoStyles };

export function cx(...args: (string | false | null | undefined)[]) {
  return args.filter(Boolean).join(' ');
}

interface DemoProps {
  children: ReactNode;
  // Demos that need a tall surface (scaled-background visibility) opt in via
  // the --demo-min-height CSS variable.
  minHeight?: number;
}

export function Demo({ children, minHeight }: DemoProps) {
  const style = minHeight ? ({ '--demo-min-height': `${minHeight}px` } as React.CSSProperties) : undefined;
  return (
    <div className={styles.demo} style={style}>
      {children}
    </div>
  );
}

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'type'> {
  accent?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, accent, className, ...rest }, ref) => {
  const style = accent ? ({ '--button-accent': accent } as React.CSSProperties) : undefined;
  return (
    <button ref={ref} {...rest} className={cx(styles.button, className)} style={style} type='button'>
      {children}
    </button>
  );
});

Button.displayName = 'Button';

// rspress's chrome stacks up to z-999 (hover menus); the drawer overlay needs
// to sit above that, with the drawer content one z above the overlay. Both
// classes are in Demo.module.css.
export const overlayClass = styles.overlay;

const directionToClass: Record<DrawerDirection, string> = {
  bottom: styles.drawerBottom,
  top: styles.drawerTop,
  right: styles.drawerRight,
  left: styles.drawerLeft,
};

export function getDrawerClass(direction: DrawerDirection): string {
  return cx(styles.drawer, directionToClass[direction]);
}

export function getSnapDrawerClass(direction: DrawerDirection = 'bottom'): string {
  const isVertical = direction === 'bottom' || direction === 'top';
  return cx(
    styles.drawer,
    directionToClass[direction],
    isVertical ? styles.drawerSnapVertical : styles.drawerSnapHorizontal,
  );
}
