import { Drawer } from '@monetr/vaul';

import { Button, Demo, getDrawerClass, overlayClass, demoStyles as styles } from './Demo';

export function ScaledBackgroundDemo() {
  return (
    <Demo minHeight={420}>
      <div className={styles.appCard} data-vaul-drawer-wrapper=''>
        <h3 className={styles.appCardTitle}>App content</h3>
        <p className={styles.appCardBody}>
          This inner card carries <code>data-vaul-drawer-wrapper</code>. When the drawer opens it scales down and rounds
          at the top, creating the iOS-style stacked card look. Imagine this card is your whole app shell.
        </p>
        <div className={styles.chipRow}>
          {['Inbox', 'Drafts', 'Sent', 'Trash'].map(label => (
            <span className={styles.chip} key={label}>
              {label}
            </span>
          ))}
        </div>
        <div className={styles.spacer} />
        <Drawer.Root setBackgroundColorOnScale={false} shouldScaleBackground>
          <Drawer.Trigger asChild>
            <Button>Open with scaled background</Button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className={overlayClass} />
            <Drawer.Content className={getDrawerClass('bottom')}>
              <Drawer.Title className={styles.title}>Scaled background</Drawer.Title>
              <Drawer.Description className={styles.description}>
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
