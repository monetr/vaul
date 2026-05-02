import { useState } from 'react';

import { Drawer } from '../../src';
import './styles.css';

const snapPoints: (number | string)[] = ['148px', '355px'];

export function HandleDrawer() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
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
            <Drawer.Handle className='vaul-test-handle' data-testid='handle' />
            <div className='vaul-test-snap-content'>
              <Drawer.Title>With handle</Drawer.Title>
              <p>handle test content</p>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
