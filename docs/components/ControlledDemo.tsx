import { useState } from 'react';

import { Drawer } from '@monetr/vaul';

import { Button, Demo, getDrawerStyle, overlayStyle } from './Demo';

export function ControlledDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Demo minHeight={120}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Button disabled={!open} onClick={() => setOpen(false)}>
          Close
        </Button>
        <span style={{ fontSize: '13px', opacity: 0.7 }}>open = {String(open)}</span>
      </div>
      <Drawer.Root onOpenChange={setOpen} open={open}>
        <Drawer.Portal>
          <Drawer.Overlay style={overlayStyle} />
          <Drawer.Content style={getDrawerStyle('bottom')}>
            <Drawer.Title style={{ margin: 0, fontSize: '18px' }}>Fully controlled</Drawer.Title>
            <Drawer.Description style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>
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
