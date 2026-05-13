import { useState } from 'react';

import { Drawer } from '@monetr/vaul';

import { Button, Demo, getSnapDrawerClass, demoStyles as styles } from './Demo';

const snapPoints: (number | string)[] = ['148px', '355px', 1];

export function NonModalSnapDemo() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  const [count, setCount] = useState(0);

  return (
    <Demo minHeight={120}>
      <div className={styles.controls}>
        <Button onClick={() => setCount(c => c + 1)}>Background clicks: {count}</Button>
        <span className={styles.status}>The button keeps responding while the drawer is open.</span>
      </div>
      <Drawer.Root activeSnapPoint={snap} modal={false} setActiveSnapPoint={setSnap} snapPoints={snapPoints}>
        <Drawer.Trigger asChild>
          <Button>Open non-modal snap drawer</Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Content className={getSnapDrawerClass()}>
            <Drawer.Title className={styles.title}>Non-modal snap</Drawer.Title>
            <Drawer.Description className={styles.description}>
              No overlay. Click the background button to confirm it still works.
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
