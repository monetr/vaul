import { Drawer } from '@monetr/vaul';

import { Button, Demo, getDrawerClass, overlayClass, demoStyles as styles } from './Demo';

export function SideDemo() {
  return (
    <Demo>
      <Drawer.Root direction='right'>
        <Drawer.Trigger asChild>
          <Button>Open from right</Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className={overlayClass} />
          <Drawer.Content className={getDrawerClass('right')}>
            <Drawer.Title className={styles.title}>Side drawer</Drawer.Title>
            <Drawer.Description className={styles.description}>
              Swipe right or click outside to dismiss.
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
