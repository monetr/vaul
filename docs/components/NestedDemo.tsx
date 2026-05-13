import { Drawer } from '@monetr/vaul';

import { Button, Demo, getDrawerClass, overlayClass, demoStyles as styles } from './Demo';

export function NestedDemo() {
  return (
    <Demo>
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <Button>Open outer</Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className={overlayClass} />
          <Drawer.Content className={getDrawerClass('bottom')}>
            <Drawer.Title className={styles.title}>Outer drawer</Drawer.Title>
            <Drawer.Description className={styles.description}>
              Tap the nested trigger to push a child drawer.
            </Drawer.Description>
            <Drawer.NestedRoot>
              <Drawer.Trigger asChild>
                <Button accent='var(--rp-c-brand)'>Open nested</Button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className={overlayClass} />
                <Drawer.Content className={getDrawerClass('bottom')}>
                  <Drawer.Title className={styles.title}>Nested drawer</Drawer.Title>
                  <Drawer.Description className={styles.description}>
                    The parent recedes while this one is open.
                  </Drawer.Description>
                  <Drawer.Close asChild>
                    <Button>Close nested</Button>
                  </Drawer.Close>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.NestedRoot>
            <Drawer.Close asChild>
              <Button>Close outer</Button>
            </Drawer.Close>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </Demo>
  );
}
