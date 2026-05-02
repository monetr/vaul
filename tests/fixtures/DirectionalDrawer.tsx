import { useState } from 'react';

import { Drawer, type DrawerDirection } from '../../src';

import './styles.css';

const contentClass: Record<DrawerDirection, string> = {
  bottom: 'vaul-test-content-bottom',
  top: 'vaul-test-content-top',
  left: 'vaul-test-content-left',
  right: 'vaul-test-content-right',
};

type Props = {
  direction: DrawerDirection;
};

export function DirectionalDrawer({ direction }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className='vaul-test-wrapper' data-vaul-drawer-wrapper=''>
      <Drawer.Root direction={direction} onOpenChange={setOpen} open={open}>
        <Drawer.Trigger asChild>
          <button className='vaul-test-trigger' data-testid='trigger' type='button'>
            Open Drawer
          </button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className='vaul-test-overlay' data-testid='overlay' />
          <Drawer.Content className={contentClass[direction]} data-testid='content'>
            <Drawer.Title>{`${direction} drawer`}</Drawer.Title>
            <Drawer.Close data-testid='drawer-close'>Close</Drawer.Close>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
