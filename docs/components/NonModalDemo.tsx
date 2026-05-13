import { useState } from 'react';

import { Drawer } from '@monetr/vaul';

import { Button, Demo, getDrawerClass, demoStyles as styles } from './Demo';

export function NonModalDemo() {
  const [count, setCount] = useState(0);

  return (
    <Demo minHeight={120}>
      <div className={styles.controls}>
        <Button onClick={() => setCount(c => c + 1)}>Background clicks: {count}</Button>
        <span className={styles.status}>Open the drawer and notice the background button still increments.</span>
      </div>
      <Drawer.Root modal={false}>
        <Drawer.Trigger asChild>
          <Button>Open non-modal drawer</Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Content className={getDrawerClass('bottom')}>
            <Drawer.Title className={styles.title}>Non-modal</Drawer.Title>
            <Drawer.Description className={styles.description}>
              No overlay is rendered. The rest of the page stays interactive.
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
