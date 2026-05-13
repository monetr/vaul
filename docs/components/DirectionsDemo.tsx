import { Drawer, type DrawerDirection } from '@monetr/vaul';

import { Button, cx, Demo, getDrawerClass, overlayClass, demoStyles as styles } from './Demo';

const directions: DrawerDirection[] = ['top', 'right', 'bottom', 'left'];

export function DirectionsDemo() {
  return (
    <Demo>
      {directions.map(direction => (
        <Drawer.Root direction={direction} key={direction}>
          <Drawer.Trigger asChild>
            <Button>Open {direction}</Button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className={overlayClass} />
            <Drawer.Content className={getDrawerClass(direction)}>
              <Drawer.Title className={cx(styles.title, styles.titleCapitalize)}>{direction} drawer</Drawer.Title>
              <Drawer.Description className={styles.description}>
                Swipe back toward the {direction} edge to dismiss.
              </Drawer.Description>
              <Drawer.Close asChild>
                <Button>Close</Button>
              </Drawer.Close>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      ))}
    </Demo>
  );
}
