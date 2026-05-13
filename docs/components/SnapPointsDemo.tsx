import { useState } from 'react';

import { Drawer } from '@monetr/vaul';

import { Button, Demo, getSnapDrawerClass, overlayClass, demoStyles as styles } from './Demo';

const snapPoints: (number | string)[] = ['148px', '355px', 1];

export function SnapPointsDemo() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  return (
    <Demo>
      <Drawer.Root activeSnapPoint={snap} setActiveSnapPoint={setSnap} snapPoints={snapPoints}>
        <Drawer.Trigger asChild>
          <Button>Open with snap points</Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className={overlayClass} />
          <Drawer.Content className={getSnapDrawerClass()}>
            <Drawer.Title className={styles.title}>Snap points</Drawer.Title>
            <Drawer.Description className={styles.description}>
              Current snap: <code>{String(snap)}</code>
            </Drawer.Description>
            <div className={styles.buttonRow}>
              {snapPoints.map(point => (
                <Button key={String(point)} onClick={() => setSnap(point)}>
                  Snap to {String(point)}
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
