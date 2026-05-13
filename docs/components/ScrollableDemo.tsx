import { Drawer } from '@monetr/vaul';

import { Button, Demo, getDrawerStyle, overlayStyle } from './Demo';

const rows = Array.from({ length: 30 }, (_, i) => `Row ${i + 1}`);

export function ScrollableDemo() {
  return (
    <Demo>
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <Button>Open scrollable drawer</Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay style={overlayStyle} />
          <Drawer.Content style={getDrawerStyle('bottom')}>
            <Drawer.Title style={{ margin: 0, fontSize: '18px' }}>Scrollable body</Drawer.Title>
            <Drawer.Description style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>
              Scroll inside the list; drag the title area to dismiss.
            </Drawer.Description>
            <div
              style={{
                overflowY: 'auto',
                maxHeight: '50vh',
                border: '1px solid var(--rp-c-divider)',
                borderRadius: '8px',
                padding: '8px',
              }}
            >
              {rows.map(row => (
                <div key={row} style={{ padding: '8px 12px', borderBottom: '1px solid var(--rp-c-divider-light)' }}>
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
