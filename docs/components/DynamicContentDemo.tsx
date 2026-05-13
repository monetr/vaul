import { useState } from 'react';

import { Drawer } from '@monetr/vaul';

import { Button, Demo, getDrawerStyle, overlayStyle } from './Demo';

const steps = [
  {
    title: 'Pick a flavor',
    body: 'Choose how you take your coffee. You can change this later in account settings.',
    options: ['Light roast', 'Medium roast', 'Dark roast'],
  },
  {
    title: 'How much?',
    body: 'Pick a size. Larger sizes have more caffeine and more room for milk.',
    options: ['Small', 'Medium', 'Large', 'Extra large'],
  },
  {
    title: 'Add-ons',
    body: 'Anything else? You can stack as many as you like before checking out.',
    options: ['Oat milk', 'Almond milk', 'Extra shot', 'Caramel', 'Vanilla', 'Whip'],
  },
];

export function DynamicContentDemo() {
  const [step, setStep] = useState(0);
  const current = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <Demo>
      <Drawer.Root
        onOpenChange={open => {
          if (!open) {
            setStep(0);
          }
        }}
      >
        <Drawer.Trigger asChild>
          <Button>Start order</Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay style={overlayStyle} />
          <Drawer.Content style={getDrawerStyle('bottom')}>
            <Drawer.Title style={{ margin: 0, fontSize: '18px' }}>{current.title}</Drawer.Title>
            <Drawer.Description style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>
              {current.body}
            </Drawer.Description>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {current.options.map(option => (
                <div
                  key={option}
                  style={{
                    padding: '10px 14px',
                    border: '1px solid var(--rp-c-divider)',
                    borderRadius: '8px',
                    background: 'var(--rp-c-bg-soft)',
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              {step > 0 ? <Button onClick={() => setStep(s => s - 1)}>Back</Button> : null}
              {isLast ? (
                <Drawer.Close asChild>
                  <Button accent='var(--rp-c-brand)'>Place order</Button>
                </Drawer.Close>
              ) : (
                <Button onClick={() => setStep(s => s + 1)}>Next</Button>
              )}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </Demo>
  );
}
