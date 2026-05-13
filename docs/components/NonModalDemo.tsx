import { useState } from 'react';

import { Drawer } from '@monetr/vaul';

import { Button, Demo, getDrawerStyle } from './Demo';

export function NonModalDemo() {
  const [count, setCount] = useState(0);

  return (
    <Demo minHeight={120}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button onClick={() => setCount(c => c + 1)}>Background clicks: {count}</Button>
        <span style={{ fontSize: '13px', opacity: 0.7 }}>
          Open the drawer and notice the background button still increments.
        </span>
      </div>
      <Drawer.Root modal={false}>
        <Drawer.Trigger asChild>
          <Button>Open non-modal drawer</Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Content style={getDrawerStyle('bottom')}>
            <Drawer.Title style={{ margin: 0, fontSize: '18px' }}>Non-modal</Drawer.Title>
            <Drawer.Description style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>
              No overlay is rendered. The rest of the page stays interactive.
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
