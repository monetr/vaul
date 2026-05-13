import { Drawer } from '@monetr/vaul';

import { Button, Demo, getDrawerStyle, overlayStyle } from './Demo';

export function SideDemo() {
  return (
    <Demo>
      <Drawer.Root direction='right'>
        <Drawer.Trigger asChild>
          <Button>Open from right</Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay style={overlayStyle} />
          <Drawer.Content style={getDrawerStyle('right')}>
            <Drawer.Title style={{ margin: 0, fontSize: '18px' }}>Side drawer</Drawer.Title>
            <Drawer.Description style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>
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
