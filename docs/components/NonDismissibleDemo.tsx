import { useState } from 'react';

import { Drawer } from '@monetr/vaul';

import { Button, Demo, getDrawerClass, overlayClass, demoStyles as styles } from './Demo';

export function NonDismissibleDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Demo minHeight={120}>
      <div className={styles.controls}>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Button disabled={!open} onClick={() => setOpen(false)}>
          Force close
        </Button>
        <span className={styles.status}>ESC, overlay tap, and drag-to-close are all disabled.</span>
      </div>
      <Drawer.Root dismissible={false} onOpenChange={setOpen} open={open}>
        <Drawer.Portal>
          <Drawer.Overlay className={overlayClass} />
          <Drawer.Content className={getDrawerClass('bottom')}>
            <Drawer.Title className={styles.title}>Non-dismissible</Drawer.Title>
            <Drawer.Description className={styles.description}>
              You can only close this drawer by calling <code>setOpen(false)</code> from outside.
            </Drawer.Description>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </Demo>
  );
}
