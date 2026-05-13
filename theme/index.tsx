import styles from './index.module.css';
import { BasicDemo } from '../docs/components/BasicDemo';

import { Layout as BaseLayout, PackageManagerTabs } from '@rspress/core/theme-original';

function HomeInstall() {
  return (
    <div className={styles.homeInstall}>
      <PackageManagerTabs command='install @monetr/vaul' />
    </div>
  );
}

function HomeTry() {
  return (
    <div className={styles.homeTry}>
      <h2 className={styles.homeTryHeading}>Try it</h2>
      <BasicDemo />
      <pre className={styles.homeTryCode}>
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
