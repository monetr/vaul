import { useState } from 'react';

import { Drawer } from '@monetr/vaul';

import { Button, cx, Demo, getSnapDrawerClass, overlayClass, demoStyles as styles } from './Demo';

const snapPoints: (number | string)[] = ['355px', 1];

export function DisabledInputsDemo() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  return (
    <Demo>
      <Drawer.Root
        activeSnapPoint={snap}
        disablePreventScroll
        repositionInputs={false}
        setActiveSnapPoint={setSnap}
        snapPoints={snapPoints}
      >
        <Drawer.Trigger asChild>
          <Button>Open without input handling</Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className={overlayClass} />
          <Drawer.Content className={getSnapDrawerClass()}>
            <Drawer.Title className={styles.title}>Input handling off</Drawer.Title>
            <Drawer.Description className={styles.description}>
              With <code>repositionInputs=false</code> the keyboard can cover the drawer. Setting{' '}
              <code>disablePreventScroll</code> also lets the page scroll behind the drawer.
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
