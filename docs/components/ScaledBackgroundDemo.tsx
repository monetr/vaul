import { Drawer } from '@monetr/vaul';

import { Button, Demo, getDrawerStyle, overlayStyle } from './Demo';

export function ScaledBackgroundDemo() {
  return (
    <Demo minHeight={420}>
      <div
        data-vaul-drawer-wrapper=''
        style={{
          width: '100%',
          minHeight: '380px',
          padding: '24px',
          borderRadius: '12px',
          background: 'var(--rp-c-bg)',
          border: '1px solid var(--rp-c-divider)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          transformOrigin: 'center top',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>App content</h3>
        <p style={{ margin: 0, fontSize: '13px', opacity: 0.8 }}>
          This inner card carries <code>data-vaul-drawer-wrapper</code>. When the drawer opens it scales down and rounds
          at the top, creating the iOS-style stacked card look. Imagine this card is your whole app shell.
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['Inbox', 'Drafts', 'Sent', 'Trash'].map(label => (
            <span
              key={label}
              style={{
                padding: '6px 10px',
                borderRadius: '999px',
                background: 'var(--rp-c-bg-soft)',
                border: '1px solid var(--rp-c-divider)',
                fontSize: '12px',
              }}
            >
              {label}
            </span>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <Drawer.Root setBackgroundColorOnScale={false} shouldScaleBackground>
          <Drawer.Trigger asChild>
            <Button>Open with scaled background</Button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay style={overlayStyle} />
            <Drawer.Content style={getDrawerStyle('bottom')}>
              <Drawer.Title style={{ margin: 0, fontSize: '18px' }}>Scaled background</Drawer.Title>
              <Drawer.Description style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>
                Watch the inner card recede behind this drawer.
              </Drawer.Description>
              <Drawer.Close asChild>
                <Button>Close</Button>
              </Drawer.Close>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </Demo>
  );
}
