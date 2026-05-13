import { Drawer } from '@monetr/vaul';

import { Button, Demo, getDrawerStyle, overlayStyle, visuallyHidden } from './Demo';

export function BasicDemo() {
  return (
    <Demo>
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <Button>Open drawer</Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay style={overlayStyle} />
          <Drawer.Content style={getDrawerStyle('bottom')}>
            <Drawer.Title style={{ margin: 0, fontSize: '18px' }}>Make changes</Drawer.Title>
            <Drawer.Description style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>
              Drag down or tap outside to dismiss.
            </Drawer.Description>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <Drawer.Close asChild>
                <Button accent='var(--rp-c-brand)'>Save</Button>
              </Drawer.Close>
              <Drawer.Close asChild>
                <Button>Cancel</Button>
              </Drawer.Close>
            </div>
            <span style={visuallyHidden}>Press Escape to close</span>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </Demo>
  );
}
