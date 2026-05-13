import { useState } from 'react';

import { Drawer } from '@monetr/vaul';

import { Button, Demo, getSnapDrawerStyle } from './Demo';

const snapPoints: (number | string)[] = ['148px', '420px'];

export function PeekBarDemo() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  const [bgClicks, setBgClicks] = useState(0);
  const activeIndex = snapPoints.indexOf(snap as string);

  return (
    <Demo minHeight={120}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button onClick={() => setBgClicks(c => c + 1)}>Background clicks: {bgClicks}</Button>
        <span style={{ fontSize: '13px', opacity: 0.7 }}>
          The peek bar sits at the bottom of the viewport while you read this page. Drag the handle to expand it. Snap
          index: {activeIndex}.
        </span>
      </div>
      <Drawer.Root
        activeSnapPoint={snap}
        defaultOpen
        dismissible={false}
        modal={false}
        setActiveSnapPoint={setSnap}
        snapPoints={snapPoints}
      >
        <Drawer.Portal>
          <Drawer.Content style={getSnapDrawerStyle()}>
            <Drawer.Handle
              style={{
                alignSelf: 'center',
                width: '48px',
                height: '5px',
                borderRadius: '999px',
                background: 'var(--rp-c-divider-dark)',
                margin: '-6px 0 4px',
              }}
            />
            <Drawer.Title style={{ margin: 0, fontSize: '18px' }}>Now playing</Drawer.Title>
            <Drawer.Description style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>
              A persistent peek bar. Drag the handle up to reveal more, drag it down to collapse, but the bar itself
              never closes.
            </Drawer.Description>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {snapPoints.map(point => (
                <Button key={String(point)} onClick={() => setSnap(point)}>
                  Snap to {String(point)}
                </Button>
              ))}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </Demo>
  );
}
