import { useState } from 'react';

import { Drawer } from '../../src';
import './styles.css';

type Props = {
  defaultOpen?: boolean;
};

export function BaseDrawer({ defaultOpen }: Props = {}) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <div className='vaul-test-wrapper' data-vaul-drawer-wrapper=''>
      <Drawer.Root defaultOpen={defaultOpen} onOpenChange={setOpen} open={open}>
        <Drawer.Trigger asChild>
          <button className='vaul-test-trigger' data-testid='trigger' type='button'>
            Open Drawer
          </button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className='vaul-test-overlay' data-testid='overlay' />
          <Drawer.Content aria-describedby={undefined} className='vaul-test-content-bottom' data-testid='content'>
            <Drawer.Title>Base drawer</Drawer.Title>
            <Drawer.Close data-testid='drawer-close'>Close</Drawer.Close>
            <button data-testid='controlled-close' onClick={() => setOpen(false)} type='button'>
              Controlled close
            </button>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
