import { Drawer } from '../../src';
import './styles.css';

export function NestedDrawers() {
  return (
    <div className='vaul-test-wrapper' data-vaul-drawer-wrapper=''>
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <button className='vaul-test-trigger' data-testid='trigger' type='button'>
            Open Drawer
          </button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className='vaul-test-overlay' data-testid='overlay' />
          <Drawer.Content aria-describedby={undefined} className='vaul-test-content-bottom' data-testid='content'>
            <Drawer.Title>Outer drawer</Drawer.Title>
            <Drawer.NestedRoot>
              <Drawer.Trigger asChild>
                <button data-testid='nested-trigger' type='button'>
                  Open Second Drawer
                </button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className='vaul-test-overlay' data-testid='nested-overlay' />
                <Drawer.Content
                  aria-describedby={undefined}
                  className='vaul-test-content-bottom'
                  data-testid='nested-content'
                >
                  <Drawer.Title>Nested drawer</Drawer.Title>
                  <Drawer.Close data-testid='nested-close'>Close</Drawer.Close>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.NestedRoot>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
