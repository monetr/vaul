import { useState } from 'react';

import { Drawer } from '@monetr/vaul';

import { Button, Demo, getSnapDrawerStyle, overlayStyle } from './Demo';

const snapPoints: (number | string)[] = ['200px', '440px', 1];

export function DynamicContentDemo() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  const [expanded, setExpanded] = useState(false);

  const rows = Array.from({ length: expanded ? 14 : 4 }, (_, i) => `Item ${i + 1}`);

  return (
    <Demo>
      <Drawer.Root activeSnapPoint={snap} setActiveSnapPoint={setSnap} snapPoints={snapPoints}>
        <Drawer.Trigger asChild>
          <Button>Open dynamic drawer</Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay style={overlayStyle} />
          <Drawer.Content style={getSnapDrawerStyle()}>
            <Drawer.Title style={{ margin: 0, fontSize: '18px' }}>Dynamic content</Drawer.Title>
            <Drawer.Description style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>
              Toggle to grow the content. Drag the drawer to a new snap as the body resizes.
            </Drawer.Description>
            <Button
              onClick={() => {
                const next = !expanded;
                setExpanded(next);
                setSnap(next ? snapPoints[1] : snapPoints[0]);
              }}
            >
              {expanded ? 'Collapse' : 'Expand'}
            </Button>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                overflowY: 'auto',
                maxHeight: '40vh',
              }}
            >
              {rows.map(row => (
                <div
                  key={row}
                  style={{ padding: '8px 12px', border: '1px solid var(--rp-c-divider)', borderRadius: '6px' }}
                >
                  {row}
                </div>
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
