import { useState } from 'react';

import { Drawer } from '../../src';
import './styles.css';

type Props = {
  disablePreventScroll?: boolean;
  defaultOpen?: boolean;
};

export function PreventScrollDrawer({ disablePreventScroll, defaultOpen }: Props = {}) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <div className='vaul-test-wrapper' data-vaul-drawer-wrapper=''>
      <Drawer.Root
        defaultOpen={defaultOpen}
        disablePreventScroll={disablePreventScroll}
        onOpenChange={setOpen}
        open={open}
      >
        <Drawer.Trigger asChild>
          <button className='vaul-test-trigger' data-testid='trigger' type='button'>
            Open Drawer
          </button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className='vaul-test-overlay' data-testid='overlay' />
          <Drawer.Content aria-describedby={undefined} className='vaul-test-content-bottom' data-testid='content'>
            <Drawer.Title>Prevent scroll fixture</Drawer.Title>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
