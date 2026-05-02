import { useState } from 'react';

import { Drawer } from '../../src';
import './styles.css';

export function NonDismissibleDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <div className='vaul-test-wrapper' data-vaul-drawer-wrapper=''>
      <Drawer.Root dismissible={false} open={open}>
        <Drawer.Trigger asChild data-testid='trigger' onClick={() => setOpen(true)}>
          <button className='vaul-test-trigger' type='button'>
            Open Drawer
          </button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className='vaul-test-overlay' data-testid='overlay' />
          <Drawer.Content aria-describedby={undefined} className='vaul-test-content-bottom' data-testid='content'>
            <Drawer.Title>Non-dismissible</Drawer.Title>
            <button data-testid='dismiss-button' onClick={() => setOpen(false)} type='button'>
              Click to close
            </button>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
