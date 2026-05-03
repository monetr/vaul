import { useState } from 'react';

import { Drawer } from '../../src';
import './styles.css';

// Two independent (NOT nested) non-modal drawers; one anchored at the top of the screen, one at the bottom. Both are
// dismissible, both have their own trigger and close button. Used to verify that two siblings can coexist without
// affecting each other's open/close state or locking the background.
//
// The default vaul-test-content-{top,bottom} CSS makes drawers cover ~half the viewport each, which would overlap our
// triggers in the middle. The inline `height` overrides shrink each drawer to a slim band so the trigger row in the
// center stays clickable.
export function TwoDrawers() {
  const [topOpen, setTopOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);
  const [bgClicks, setBgClicks] = useState(0);

  return (
    <div data-testid='page-root' style={{ padding: 16 }}>
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        <button data-testid='top-trigger' onClick={() => setTopOpen(true)} type='button'>
          Open top
        </button>
        <button data-testid='bottom-trigger' onClick={() => setBottomOpen(true)} type='button'>
          Open bottom
        </button>
        <button data-testid='bg-button' onClick={() => setBgClicks(c => c + 1)} type='button'>
          Background button
        </button>
        <span data-testid='bg-clicks'>{bgClicks}</span>
      </div>

      <Drawer.Root direction='top' modal={false} onOpenChange={setTopOpen} open={topOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className='vaul-test-overlay' data-testid='top-overlay' />
          <Drawer.Content
            aria-describedby={undefined}
            className='vaul-test-content-top'
            data-testid='top-content'
            style={{ height: '20%' }}
          >
            <Drawer.Title>Top drawer</Drawer.Title>
            <Drawer.Close data-testid='top-close'>Close top</Drawer.Close>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      <Drawer.Root direction='bottom' modal={false} onOpenChange={setBottomOpen} open={bottomOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className='vaul-test-overlay' data-testid='bottom-overlay' />
          <Drawer.Content
            aria-describedby={undefined}
            className='vaul-test-content-bottom'
            data-testid='bottom-content'
            style={{ height: '20%', marginTop: 0 }}
          >
            <Drawer.Title>Bottom drawer</Drawer.Title>
            <Drawer.Close data-testid='bottom-close'>Close bottom</Drawer.Close>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
