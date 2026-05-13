import { useState } from 'react';

import { Drawer } from '@monetr/vaul';

import { Button, Demo, getDrawerStyle, overlayStyle } from './Demo';

export function CoexistingDrawersDemo() {
  const [topOpen, setTopOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);
  const [bgClicks, setBgClicks] = useState(0);

  return (
    <Demo minHeight={120}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button onClick={() => setTopOpen(true)}>Open top</Button>
        <Button onClick={() => setBottomOpen(true)}>Open bottom</Button>
        <Button onClick={() => setBgClicks(c => c + 1)}>Background clicks: {bgClicks}</Button>
        <span style={{ fontSize: '13px', opacity: 0.7 }}>
          Open both at once. The background button keeps responding.
        </span>
      </div>

      <Drawer.Root direction='top' modal={false} onOpenChange={setTopOpen} open={topOpen}>
        <Drawer.Portal>
          <Drawer.Overlay style={overlayStyle} />
          <Drawer.Content style={getDrawerStyle('top')}>
            <Drawer.Title style={{ margin: 0, fontSize: '18px' }}>Top drawer</Drawer.Title>
            <Drawer.Description style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>
              I am an independent drawer anchored to the top. Closing the bottom drawer does not affect me.
            </Drawer.Description>
            <Drawer.Close asChild>
              <Button>Close top</Button>
            </Drawer.Close>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      <Drawer.Root direction='bottom' modal={false} onOpenChange={setBottomOpen} open={bottomOpen}>
        <Drawer.Portal>
          <Drawer.Overlay style={overlayStyle} />
          <Drawer.Content style={getDrawerStyle('bottom')}>
            <Drawer.Title style={{ margin: 0, fontSize: '18px' }}>Bottom drawer</Drawer.Title>
            <Drawer.Description style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>
              I am an independent drawer anchored to the bottom. We are siblings, not nested.
            </Drawer.Description>
            <Drawer.Close asChild>
              <Button>Close bottom</Button>
            </Drawer.Close>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </Demo>
  );
}
