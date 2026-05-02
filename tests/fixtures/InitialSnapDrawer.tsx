import { useState } from 'react';

import { Drawer } from '../../src';
import './styles.css';

const snapPoints: (number | string)[] = [0, '148px', '355px', 1];

export function InitialSnapDrawer() {
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
          <Drawer.Content className='vaul-test-content-snap' data-testid='content'>
            <div className='vaul-test-snap-content'>
              <Drawer.Title>Initial snap</Drawer.Title>
              <p>scrollable content for snap-point sizing</p>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
