import { Drawer } from '@monetr/vaul';

import { Button, Demo, getDrawerClass, overlayClass, demoStyles as styles } from './Demo';

const rows = Array.from({ length: 30 }, (_, i) => `Row ${i + 1}`);

export function ScrollableDemo() {
  return (
    <Demo>
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <Button>Open scrollable drawer</Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className={overlayClass} />
          <Drawer.Content className={getDrawerClass('bottom')}>
            <Drawer.Title className={styles.title}>Scrollable body</Drawer.Title>
            <Drawer.Description className={styles.description}>
              Scroll inside the list; drag the title area to dismiss.
            </Drawer.Description>
            <div className={styles.scrollList}>
              {rows.map(row => (
                <div className={styles.scrollListItem} key={row}>
                  {row}
                </div>
              ))}
            </div>
            <Drawer.Close asChild>
              <Button>Close</Button>
            </Drawer.Close>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </Demo>
  );
}
