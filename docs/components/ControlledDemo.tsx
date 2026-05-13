import { useState } from 'react';

import { Drawer } from '@monetr/vaul';

import { Button, Demo, getDrawerClass, overlayClass, demoStyles as styles } from './Demo';

export function ControlledDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Demo minHeight={120}>
      <div className={styles.controls}>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Button disabled={!open} onClick={() => setOpen(false)}>
          Close
        </Button>
        <span className={styles.status}>open = {String(open)}</span>
      </div>
      <Drawer.Root onOpenChange={setOpen} open={open}>
        <Drawer.Portal>
          <Drawer.Overlay className={overlayClass} />
          <Drawer.Content className={getDrawerClass('bottom')}>
            <Drawer.Title className={styles.title}>Fully controlled</Drawer.Title>
            <Drawer.Description className={styles.description}>
              Both <code>open</code> and <code>onOpenChange</code> are wired, so dragging or clicking the overlay closes
              the drawer just like the uncontrolled case.
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
