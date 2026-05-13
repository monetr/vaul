import { useState } from 'react';

import { Drawer } from '@monetr/vaul';

import { Button, Demo, getSnapDrawerStyle, overlayStyle } from './Demo';

const snapPoints: (number | string)[] = ['200px', '440px', 1];

export function HandleOnlyDemo() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  return (
    <Demo>
      <Drawer.Root activeSnapPoint={snap} handleOnly setActiveSnapPoint={setSnap} snapPoints={snapPoints}>
        <Drawer.Trigger asChild>
          <Button>Open handle-only drawer</Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay style={overlayStyle} />
          <Drawer.Content style={getSnapDrawerStyle()}>
            <Drawer.Handle
              style={{
                alignSelf: 'center',
                width: '48px',
                height: '5px',
                borderRadius: '999px',
                background: 'var(--rp-c-divider-dark)',
                margin: '-6px 0 4px',
              }}
            />
            <Drawer.Title style={{ margin: 0, fontSize: '18px' }}>Handle-only</Drawer.Title>
            <Drawer.Description style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>
              The body of this drawer is not draggable. Use the handle above to drag between snap points or tap it to
              cycle.
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
