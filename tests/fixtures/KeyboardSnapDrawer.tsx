import { useState } from 'react';

import { Drawer } from '../../src';
import './styles.css';

const snapPoints: (number | string)[] = ['200px', '500px'];

export function KeyboardSnapDrawer() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  return (
    <div className='vaul-test-wrapper' data-vaul-drawer-wrapper=''>
      <Drawer.Root activeSnapPoint={snap} open repositionInputs setActiveSnapPoint={setSnap} snapPoints={snapPoints}>
        <Drawer.Trigger asChild>
          <button className='vaul-test-trigger' data-testid='trigger' type='button'>
            Open Drawer
          </button>
        </Drawer.Trigger>
        <Drawer.Overlay className='vaul-test-overlay' data-testid='overlay' />
        <Drawer.Portal>
          <Drawer.Content aria-describedby={undefined} className='vaul-test-content-snap' data-testid='content'>
            <Drawer.Title>Keyboard snap fixture</Drawer.Title>
            <input data-testid='kb-input' type='text' />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
