import { useState } from 'react';

import { Drawer } from '@monetr/vaul';

import { Button, Demo, getSnapDrawerStyle, overlayStyle } from './Demo';

const snapPoints: (number | string)[] = ['148px', '355px', 1];

export function SnapPointsDemo() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  return (
    <Demo>
      <Drawer.Root activeSnapPoint={snap} setActiveSnapPoint={setSnap} snapPoints={snapPoints}>
        <Drawer.Trigger asChild>
          <Button>Open with snap points</Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay style={overlayStyle} />
          <Drawer.Content style={getSnapDrawerStyle()}>
            <Drawer.Title style={{ margin: 0, fontSize: '18px' }}>Snap points</Drawer.Title>
            <Drawer.Description style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>
              Current snap: <code>{String(snap)}</code>
            </Drawer.Description>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {snapPoints.map(point => (
                <Button key={String(point)} onClick={() => setSnap(point)}>
                  Snap to {String(point)}
                </Button>
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
