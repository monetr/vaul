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

export function DisabledInputsDemo() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  return (
    <Demo>
      <Drawer.Root
        activeSnapPoint={snap}
        disablePreventScroll
        repositionInputs={false}
        setActiveSnapPoint={setSnap}
        snapPoints={snapPoints}
      >
        <Drawer.Trigger asChild>
          <Button>Open without input handling</Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay style={overlayStyle} />
          <Drawer.Content style={getSnapDrawerStyle()}>
            <Drawer.Title style={{ margin: 0, fontSize: '18px' }}>Input handling off</Drawer.Title>
            <Drawer.Description style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>
              With <code>repositionInputs=false</code> the keyboard can cover the drawer. Setting
              <code>disablePreventScroll</code> also lets the page scroll behind the drawer.
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
