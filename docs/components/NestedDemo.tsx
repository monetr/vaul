import { Drawer } from '@monetr/vaul';

import { Button, Demo, getDrawerStyle, overlayStyle } from './Demo';

export function NestedDemo() {
  return (
    <Demo>
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <Button>Open outer</Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay style={overlayStyle} />
          <Drawer.Content style={getDrawerStyle('bottom')}>
            <Drawer.Title style={{ margin: 0, fontSize: '18px' }}>Outer drawer</Drawer.Title>
            <Drawer.Description style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>
              Tap the nested trigger to push a child drawer.
            </Drawer.Description>
            <Drawer.NestedRoot>
              <Drawer.Trigger asChild>
                <Button accent='var(--rp-c-brand)'>Open nested</Button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay style={overlayStyle} />
                <Drawer.Content style={getDrawerStyle('bottom')}>
                  <Drawer.Title style={{ margin: 0, fontSize: '18px' }}>Nested drawer</Drawer.Title>
                  <Drawer.Description style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>
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
