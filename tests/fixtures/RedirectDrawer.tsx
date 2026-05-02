import { useState } from 'react';

import { Drawer } from '../../src';
import './styles.css';

function LongPage() {
  return (
    <div className='vaul-test-long'>
      <p className='top-block'>scroll down</p>
      <p className='bottom-block' data-testid='content'>
        content only visible after scroll
      </p>
    </div>
  );
}

export function RedirectDrawer() {
  const [redirected, setRedirected] = useState(false);

  if (redirected) {
    return <LongPage />;
  }

  return (
    <div className='vaul-test-wrapper'>
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <button className='vaul-test-trigger' data-testid='trigger' type='button'>
            Open Drawer
          </button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className='vaul-test-overlay' data-testid='overlay' />
          <Drawer.Content aria-describedby={undefined} className='vaul-test-content-bottom' data-testid='content'>
            <Drawer.Title>Redirect</Drawer.Title>
            <Drawer.Close data-testid='drawer-close'>Close</Drawer.Close>
            <button
              className='vaul-test-link'
              data-testid='link'
              onClick={() => {
                // Mimic SPA navigation: change URL in the same tick the drawer is unmounting,
                // so usePositionFixed's restorePositionSetting runs against a real history transition.
                window.history.pushState({}, '', '/long-page');
                setRedirected(true);
              }}
              type='button'
            >
              navigate
            </button>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
