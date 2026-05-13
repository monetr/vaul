import { useState } from 'react';

import { Drawer } from '@monetr/vaul';

import { Button, Demo, getSnapDrawerClass, demoStyles as styles } from './Demo';

const snapPoints: (number | string)[] = ['148px', '420px'];

export function PeekBarDemo() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  const [bgClicks, setBgClicks] = useState(0);
  const activeIndex = snapPoints.indexOf(snap as string);

  return (
    <Demo minHeight={120}>
      <div className={styles.controls}>
        <Button onClick={() => setBgClicks(c => c + 1)}>Background clicks: {bgClicks}</Button>
        <span className={styles.status}>
          The peek bar sits at the bottom of the viewport while you read this page. Drag the handle to expand it. Snap
          index: {activeIndex}.
        </span>
      </div>
      <Drawer.Root
        activeSnapPoint={snap}
        defaultOpen
        dismissible={false}
        modal={false}
        setActiveSnapPoint={setSnap}
        snapPoints={snapPoints}
      >
        <Drawer.Portal>
          <Drawer.Content className={getSnapDrawerClass()}>
            <Drawer.Handle className={styles.handle} />
            <Drawer.Title className={styles.title}>Now playing</Drawer.Title>
            <Drawer.Description className={styles.description}>
              A persistent peek bar. Drag the handle up to reveal more, drag it down to collapse, but the bar itself
              never closes.
            </Drawer.Description>
            <div className={styles.buttonRow}>
              {snapPoints.map(point => (
                <Button key={String(point)} onClick={() => setSnap(point)}>
                  Snap to {String(point)}
                </Button>
              ))}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </Demo>
  );
}
