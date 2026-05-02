import { useState } from 'react';

import { Drawer } from '../../src';
import './styles.css';

const snapPoints: (number | string)[] = [0, '148px', '355px', 1];

// Mirror of InitialSnapDrawer with an extra `set-snap-2` button placed inside content. The
// drawer is hardcoded `open` (not controlled) to match the working InitialSnapDrawer baseline.
export function SnapToggleDrawer() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[1]);
  const activeSnapPointIndex = snapPoints.indexOf(snap as string);

  return (
    <div className='vaul-test-wrapper'>
      <div data-testid='active-snap-index'>{activeSnapPointIndex}</div>
      <Drawer.Root activeSnapPoint={snap} open setActiveSnapPoint={setSnap} snapPoints={snapPoints}>
        <Drawer.Trigger asChild>
          <button className='vaul-test-trigger' data-testid='trigger' type='button'>
            Open Drawer
          </button>
        </Drawer.Trigger>
        <Drawer.Overlay className='vaul-test-overlay' data-testid='overlay' />
        <Drawer.Portal>
          <Drawer.Content aria-describedby={undefined} className='vaul-test-content-snap' data-testid='content'>
            <div className='vaul-test-snap-content'>
              <Drawer.Title>Snap toggle</Drawer.Title>
              <p>scrollable content for snap-point sizing</p>
              <button data-testid='set-snap-2' onClick={() => setSnap(snapPoints[2])} type='button'>
                Snap to 2
              </button>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
