import { useEffect, useState } from 'react';

import { Drawer } from '@monetr/vaul';

import { Button, Demo, getSnapDrawerClass, demoStyles as styles } from './Demo';

// Mirrors tests/fixtures/CollidingSnapDrawers.tsx but trimmed for docs. Two non-modal drawers
// (top + bottom) share the same percent snap points. A negotiator effect keeps their combined
// snap fractions <= 1 by dropping whichever drawer wasn't last interacted with to the largest
// snap that still fits, and when nothing fits the loser pins to the smallest snap so the
// winner's higher z-index does the visual tie-breaking.

const SNAP_POINTS: number[] = [0.3, 0.5, 0.7, 0.9];

type Side = 'top' | 'bottom';

function asFraction(snap: number | string | null): number {
  return typeof snap === 'number' ? snap : 0;
}

function largestFit(winnerFrac: number): number {
  for (let i = SNAP_POINTS.length - 1; i >= 0; i--) {
    if (winnerFrac + SNAP_POINTS[i] <= 1) {
      return SNAP_POINTS[i];
    }
  }
  return SNAP_POINTS[0];
}

export function CollidingSnapDrawersDemo() {
  const [topOpen, setTopOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);
  const [topSnap, setTopSnap] = useState<number | string | null>(SNAP_POINTS[0]);
  const [bottomSnap, setBottomSnap] = useState<number | string | null>(SNAP_POINTS[0]);
  const [lastInteracted, setLastInteracted] = useState<Side>('top');

  useEffect(() => {
    if (!topOpen || !bottomOpen) {
      return;
    }
    const topFrac = asFraction(topSnap);
    const bottomFrac = asFraction(bottomSnap);
    if (topFrac + bottomFrac <= 1) {
      return;
    }

    if (lastInteracted === 'top') {
      const fit = largestFit(topFrac);
      if (fit !== bottomFrac) {
        setBottomSnap(fit);
      }
    } else {
      const fit = largestFit(bottomFrac);
      if (fit !== topFrac) {
        setTopSnap(fit);
      }
    }
  }, [topOpen, bottomOpen, topSnap, bottomSnap, lastInteracted]);

  const onTopSnap = (snap: number | string | null) => {
    setLastInteracted('top');
    setTopSnap(snap);
  };
  const onBottomSnap = (snap: number | string | null) => {
    setLastInteracted('bottom');
    setBottomSnap(snap);
  };
  const onTopOpenChange = (open: boolean) => {
    if (open) {
      setLastInteracted('top');
    }
    setTopOpen(open);
  };
  const onBottomOpenChange = (open: boolean) => {
    if (open) {
      setLastInteracted('bottom');
    }
    setBottomOpen(open);
  };

  const topZ = lastInteracted === 'top' ? 1002 : 1001;
  const bottomZ = lastInteracted === 'bottom' ? 1002 : 1001;

  return (
    <Demo minHeight={140}>
      <div className={styles.controls}>
        <Button onClick={() => onTopOpenChange(true)}>Open top</Button>
        <Button onClick={() => onBottomOpenChange(true)}>Open bottom</Button>
        <span className={styles.status}>
          Last interacted: <strong>{lastInteracted}</strong> / top: {String(topSnap)} / bottom: {String(bottomSnap)}
        </span>
      </div>

      <Drawer.Root
        activeSnapPoint={topSnap}
        direction='top'
        modal={false}
        onOpenChange={onTopOpenChange}
        open={topOpen}
        setActiveSnapPoint={onTopSnap}
        snapPoints={SNAP_POINTS}
      >
        <Drawer.Portal>
          <Drawer.Content className={getSnapDrawerClass('top')} style={{ zIndex: topZ }}>
            <Drawer.Title className={styles.title}>Top drawer</Drawer.Title>
            <Drawer.Description className={styles.description}>
              Drag me past the bottom drawer. I stay where you left me; the other drawer shrinks to fit.
            </Drawer.Description>
            <div className={styles.buttonRow}>
              {SNAP_POINTS.map(p => (
                <Button key={p} onClick={() => onTopSnap(p)}>
                  Snap {p}
                </Button>
              ))}
            </div>
            <Drawer.Close asChild>
              <Button>Close top</Button>
            </Drawer.Close>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      <Drawer.Root
        activeSnapPoint={bottomSnap}
        direction='bottom'
        modal={false}
        onOpenChange={onBottomOpenChange}
        open={bottomOpen}
        setActiveSnapPoint={onBottomSnap}
        snapPoints={SNAP_POINTS}
      >
        <Drawer.Portal>
          <Drawer.Content className={getSnapDrawerClass('bottom')} style={{ zIndex: bottomZ }}>
            <Drawer.Title className={styles.title}>Bottom drawer</Drawer.Title>
            <Drawer.Description className={styles.description}>
              I yield to whoever was touched most recently. If we still overlap, the most recent one paints on top.
            </Drawer.Description>
            <div className={styles.buttonRow}>
              {SNAP_POINTS.map(p => (
                <Button key={p} onClick={() => onBottomSnap(p)}>
                  Snap {p}
                </Button>
              ))}
            </div>
            <Drawer.Close asChild>
              <Button>Close bottom</Button>
            </Drawer.Close>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </Demo>
  );
}
