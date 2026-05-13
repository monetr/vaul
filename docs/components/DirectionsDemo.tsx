import { Drawer, type DrawerDirection } from '@monetr/vaul';

import { Button, Demo, getDrawerStyle, overlayStyle } from './Demo';

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
            <Drawer.Overlay style={overlayStyle} />
            <Drawer.Content style={getDrawerStyle(direction)}>
              <Drawer.Title style={{ margin: 0, fontSize: '18px', textTransform: 'capitalize' }}>
                {direction} drawer
              </Drawer.Title>
              <Drawer.Description style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>
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
