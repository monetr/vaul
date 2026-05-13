import { useState } from 'react';

import { Drawer } from '@monetr/vaul';

import { Button, Demo, getDrawerStyle, overlayStyle } from './Demo';

export function NonDismissibleDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Demo minHeight={120}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Button disabled={!open} onClick={() => setOpen(false)}>
          Force close
        </Button>
        <span style={{ fontSize: '13px', opacity: 0.7 }}>ESC, overlay tap, and drag-to-close are all disabled.</span>
      </div>
      <Drawer.Root dismissible={false} onOpenChange={setOpen} open={open}>
        <Drawer.Portal>
          <Drawer.Overlay style={overlayStyle} />
          <Drawer.Content style={getDrawerStyle('bottom')}>
            <Drawer.Title style={{ margin: 0, fontSize: '18px' }}>Non-dismissible</Drawer.Title>
            <Drawer.Description style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>
              You can only close this drawer by calling <code>setOpen(false)</code> from outside.
            </Drawer.Description>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </Demo>
  );
}
