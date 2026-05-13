import { useState } from 'react';

import { Drawer } from '@monetr/vaul';

import { Button, Demo, getSnapDrawerClass, overlayClass, demoStyles as styles } from './Demo';

const snapPoints: (number | string)[] = ['148px', '355px', 1];

export function SequentialSnapDemo() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  return (
    <Demo>
      <Drawer.Root activeSnapPoint={snap} setActiveSnapPoint={setSnap} snapPoints={snapPoints} snapToSequentialPoint>
        <Drawer.Trigger asChild>
          <Button>Open sequential drawer</Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className={overlayClass} />
          <Drawer.Content className={getSnapDrawerClass()}>
            <Drawer.Title className={styles.title}>Sequential snap</Drawer.Title>
            <Drawer.Description className={styles.description}>
              Fast flicks skip ahead by default. With <code>snapToSequentialPoint</code>, the drawer always advances
              exactly one snap point per gesture.
            </Drawer.Description>
            <Drawer.Close asChild>
              <Button>Close</Button>
            </Drawer.Close>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </Demo>
  );
}
