import { useEffect, useState } from 'react';

import { Drawer } from '../../src';
import './styles.css';

// Two non-modal drawers (top + bottom), both with the same percent snap points. They are
// independently controlled, but a small "negotiator" effect keeps their snap points from
// overlapping: when top + bottom > 1 the most recently interacted drawer wins and the other
// is dropped to the largest snap point that still fits. If no snap point fits (i.e. winner is
// large enough that even the loser's smallest snap still overlaps), the loser pins to its
// smallest snap and z-index alone resolves the remaining overlap so the winner paints on top.
//
// The grow/shrink buttons in the middle are deliberate single-click hooks for tests: dragging
// from one snap to another is exercised elsewhere, here we want predictable snap transitions.

const SNAP_POINTS: number[] = [0.3, 0.5, 0.7, 0.9];

type Side = 'top' | 'bottom';

function asFraction(snap: number | string | null): number {
  return typeof snap === 'number' ? snap : 0;
}

// Largest snap <= (1 - winnerFrac). Returns SNAP_POINTS[0] when nothing fits so the loser at
// least shrinks to its smallest available point.
function largestFit(winnerFrac: number): number {
  for (let i = SNAP_POINTS.length - 1; i >= 0; i--) {
    if (winnerFrac + SNAP_POINTS[i] <= 1) {
      return SNAP_POINTS[i];
    }
  }
  return SNAP_POINTS[0];
}

export function CollidingSnapDrawers() {
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

  const topZ = lastInteracted === 'top' ? 20 : 10;
  const bottomZ = lastInteracted === 'bottom' ? 20 : 10;

  return (
    <div data-testid='page-root' style={{ padding: 16 }}>
      {/* Float controls above both drawers so tests can still click them when a drawer covers
          the page center at large snap points. */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.85)',
          padding: 8,
          borderRadius: 6,
        }}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <button data-testid='top-trigger' onClick={() => onTopOpenChange(true)} type='button'>
            Open top
          </button>
          <button data-testid='bottom-trigger' onClick={() => onBottomOpenChange(true)} type='button'>
            Open bottom
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {SNAP_POINTS.map(p => (
            <button data-testid={`top-snap-${p}`} key={`t${p}`} onClick={() => onTopSnap(p)} type='button'>
              Top {p}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {SNAP_POINTS.map(p => (
            <button data-testid={`bottom-snap-${p}`} key={`b${p}`} onClick={() => onBottomSnap(p)} type='button'>
              Bottom {p}
            </button>
          ))}
        </div>
        <div data-testid='last-interacted'>{lastInteracted}</div>
        <div data-testid='top-snap'>{String(topSnap)}</div>
        <div data-testid='bottom-snap'>{String(bottomSnap)}</div>
        <div data-testid='top-z'>{topZ}</div>
        <div data-testid='bottom-z'>{bottomZ}</div>
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
          <Drawer.Content
            aria-describedby={undefined}
            className='vaul-test-content-top'
            data-testid='top-content'
            style={{ height: '100%', zIndex: topZ }}
          >
            <Drawer.Title>Top</Drawer.Title>
            <Drawer.Close data-testid='top-close'>Close top</Drawer.Close>
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
          <Drawer.Content
            aria-describedby={undefined}
            className='vaul-test-content-bottom'
            data-testid='bottom-content'
            style={{ height: '100%', marginTop: 0, zIndex: bottomZ }}
          >
            <Drawer.Title>Bottom</Drawer.Title>
            <Drawer.Close data-testid='bottom-close'>Close bottom</Drawer.Close>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
