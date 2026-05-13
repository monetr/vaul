import { BasicDemo } from '../docs/components/BasicDemo';

import { Layout as BaseLayout, PackageManagerTabs } from '@rspress/core/theme-original';

function HomeInstall() {
  return (
    <div className='home-install' style={{ maxWidth: 800, margin: '0 auto 48px', padding: '0 24px' }}>
      <PackageManagerTabs command='install @monetr/vaul' />
    </div>
  );
}

function HomeTry() {
  return (
    <div className='home-try' style={{ maxWidth: 960, margin: '0 auto 80px', padding: '0 24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Try it</h2>
      <BasicDemo />
      <pre
        style={{
          background: 'var(--rp-c-bg-soft)',
          border: '1px solid var(--rp-c-divider)',
          borderRadius: '12px',
          padding: '16px 20px',
          overflowX: 'auto',
          fontSize: '13px',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        <code>{`import { Drawer } from '@monetr/vaul';

export function MyDrawer() {
  return (
    <Drawer.Root>
      <Drawer.Trigger>Open</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Title>Make changes</Drawer.Title>
          <Drawer.Description>Drag down or tap outside to dismiss.</Drawer.Description>
          <Drawer.Close>Save</Drawer.Close>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}`}</code>
      </pre>
    </div>
  );
}

function Layout() {
  return <BaseLayout afterFeatures={<HomeTry />} afterHero={<HomeInstall />} />;
}

export * from '@rspress/core/theme-original';
export { Layout };
