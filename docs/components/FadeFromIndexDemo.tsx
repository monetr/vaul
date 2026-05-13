import { useState } from 'react';

import { Drawer } from '@monetr/vaul';

import { Button, Demo, getSnapDrawerClass, overlayClass, demoStyles as styles } from './Demo';

const snapPoints: (number | string)[] = ['148px', '400px', 1];

export function FadeFromIndexDemo() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  return (
    <Demo>
      <Drawer.Root activeSnapPoint={snap} fadeFromIndex={1} setActiveSnapPoint={setSnap} snapPoints={snapPoints}>
        <Drawer.Trigger asChild>
          <Button>Open with fadeFromIndex</Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className={overlayClass} />
          <Drawer.Content className={getSnapDrawerClass()}>
            <Drawer.Title className={styles.title}>fadeFromIndex</Drawer.Title>
            <Drawer.Description className={styles.description}>
              The overlay stays transparent at the first snap and fades in as the drawer crosses the second snap point.
            </Drawer.Description>
            <div className={styles.buttonRow}>
              {snapPoints.map(point => (
                <Button key={String(point)} onClick={() => setSnap(point)}>
                  {String(point)}
                </Button>
              ))}
            </div>
            <Drawer.Close asChild>
              <Button>Close</Button>
            </Drawer.Close>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </Demo>
  );
}
