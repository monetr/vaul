import { useState } from 'react';

import { Drawer } from '../../src';
import './styles.css';

export function ControlledDrawer() {
  const [open, setOpen] = useState(false);
  const [fullyControlled, setFullyControlled] = useState(false);

  return (
    <div className='vaul-test-wrapper' data-vaul-drawer-wrapper=''>
      {/* Open-only-controlled (no onOpenChange): clicking the overlay should NOT close */}
      <Drawer.Root open={open}>
        <Drawer.Trigger asChild onClick={() => setOpen(true)}>
          <button className='vaul-test-trigger' data-testid='trigger' type='button'>
            Open Drawer
          </button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className='vaul-test-overlay' data-testid='overlay' />
          <Drawer.Content aria-describedby={undefined} className='vaul-test-content-bottom' data-testid='content'>
            <Drawer.Title>Controlled</Drawer.Title>
            <Drawer.Close data-testid='drawer-close'>Close</Drawer.Close>
            <button data-testid='controlled-close' onClick={() => setOpen(false)} type='button'>
              Controlled close
            </button>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      {/* Fully controlled (onOpenChange wired up): overlay click DOES close */}
      <Drawer.Root onOpenChange={o => setFullyControlled(o)} open={fullyControlled}>
        <Drawer.Trigger asChild>
          <button className='vaul-test-trigger' data-testid='fully-controlled-trigger' type='button'>
            Open Drawer
          </button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className='vaul-test-overlay' data-testid='fully-controlled-overlay' />
          <Drawer.Content
            aria-describedby={undefined}
            className='vaul-test-content-bottom'
            data-testid='fully-controlled-content'
          >
            <Drawer.Title>Fully controlled</Drawer.Title>
            <Drawer.Close data-testid='fully-controlled-close'>Close</Drawer.Close>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
