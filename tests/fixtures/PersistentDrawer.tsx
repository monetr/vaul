import { useState } from 'react';

import { Drawer } from '../../src';
import './styles.css';

const snapPoints: (number | string)[] = ['148px', '355px'];
const PEEK_HEIGHT = 148;

// A persistent peek bar: always visible at the bottom (defaultOpen + dismissible=false), snap-pointed so it can expand
// to a larger view, and non-modal so the main page stays fully interactive (and scrollable) while the bar sits on top.
export function PersistentDrawer() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  const [bgClicks, setBgClicks] = useState(0);
  const activeSnapPointIndex = snapPoints.indexOf(snap as string);

  return (
    <div data-testid='page-root' style={{ paddingBottom: PEEK_HEIGHT }}>
      <div style={{ padding: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
        <span data-testid='active-snap-index'>{activeSnapPointIndex}</span>
        <span data-testid='bg-clicks'>{bgClicks}</span>
        <button data-testid='bg-button-top' onClick={() => setBgClicks(c => c + 1)} type='button'>
          Background button
        </button>
      </div>
      <ol style={{ padding: '0 24px', margin: 0, lineHeight: '2rem' }}>
        {Array.from({ length: 60 }, (_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: This is just a test file its not that big of a deal
          <li data-testid={i === 59 ? 'last-item' : undefined} key={i}>
            Item {i + 1}
          </li>
        ))}
      </ol>
      <Drawer.Root
        activeSnapPoint={snap}
        defaultOpen
        dismissible={false}
        modal={false}
        setActiveSnapPoint={setSnap}
        snapPoints={snapPoints}
      >
        <Drawer.Overlay className='vaul-test-overlay' data-testid='overlay' />
        <Drawer.Portal>
          <Drawer.Content aria-describedby={undefined} className='vaul-test-content-snap' data-testid='content'>
            <Drawer.Handle className='vaul-test-handle' data-testid='handle' />
            <div className='vaul-test-snap-content'>
              <Drawer.Title>Persistent</Drawer.Title>
              <p>persistent peek bar</p>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
