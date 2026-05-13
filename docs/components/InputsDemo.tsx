import { useState } from 'react';

import { Drawer } from '@monetr/vaul';

import { Button, Demo, getSnapDrawerStyle, overlayStyle } from './Demo';

const snapPoints: (number | string)[] = ['355px', 1];

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid var(--rp-c-divider)',
  borderRadius: '8px',
  background: 'var(--rp-c-bg)',
  color: 'var(--rp-c-text-1)',
  fontSize: '14px',
  fontFamily: 'inherit',
  boxSizing: 'border-box' as const,
};

export function InputsDemo() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  return (
    <Demo>
      <Drawer.Root activeSnapPoint={snap} setActiveSnapPoint={setSnap} snapPoints={snapPoints}>
        <Drawer.Trigger asChild>
          <Button>Open drawer with inputs</Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay style={overlayStyle} />
          <Drawer.Content style={getSnapDrawerStyle()}>
            <Drawer.Title style={{ margin: 0, fontSize: '18px' }}>Reposition inputs</Drawer.Title>
            <Drawer.Description style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>
              On mobile, vaul shifts the drawer up so the focused field stays visible above the keyboard. The default is{' '}
              <code>repositionInputs=true</code> when snap points are set.
            </Drawer.Description>
            <input placeholder='Name' style={inputStyle} type='text' />
            <textarea placeholder='Notes' rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
            <Drawer.Close asChild>
              <Button>Close</Button>
            </Drawer.Close>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </Demo>
  );
}
