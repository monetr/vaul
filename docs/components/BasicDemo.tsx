import { Drawer } from '@monetr/vaul';

import { Button, Demo, getDrawerClass, overlayClass, demoStyles as styles } from './Demo';

export function BasicDemo() {
  return (
    <Demo>
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <Button>Open drawer</Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className={overlayClass} />
          <Drawer.Content className={getDrawerClass('bottom')}>
            <Drawer.Title className={styles.title}>Make changes</Drawer.Title>
            <Drawer.Description className={styles.description}>Drag down or tap outside to dismiss.</Drawer.Description>
            <div className={styles.buttonRowSpaced}>
              <Drawer.Close asChild>
                <Button accent='var(--rp-c-brand)'>Save</Button>
              </Drawer.Close>
              <Drawer.Close asChild>
                <Button>Cancel</Button>
              </Drawer.Close>
            </div>
            <span className={styles.visuallyHidden}>Press Escape to close</span>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </Demo>
  );
}
