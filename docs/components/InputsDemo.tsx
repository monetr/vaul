import { useState } from 'react';

import { Drawer } from '@monetr/vaul';

import { Button, cx, Demo, getSnapDrawerClass, overlayClass, demoStyles as styles } from './Demo';

const snapPoints: (number | string)[] = ['355px', 1];

export function InputsDemo() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  return (
    <Demo>
      <Drawer.Root activeSnapPoint={snap} setActiveSnapPoint={setSnap} snapPoints={snapPoints}>
        <Drawer.Trigger asChild>
          <Button>Open drawer with inputs</Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className={overlayClass} />
          <Drawer.Content className={getSnapDrawerClass()}>
            <Drawer.Title className={styles.title}>Reposition inputs</Drawer.Title>
            <Drawer.Description className={styles.description}>
              On mobile, vaul shifts the drawer up so the focused field stays visible above the keyboard. The default is{' '}
              <code>repositionInputs=true</code> when snap points are set.
            </Drawer.Description>
            <input className={styles.input} placeholder='Name' type='text' />
            <textarea className={cx(styles.input, styles.textarea)} placeholder='Notes' rows={3} />
            <Drawer.Close asChild>
              <Button>Close</Button>
            </Drawer.Close>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </Demo>
  );
}
