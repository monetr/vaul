import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { BaseDrawer } from '../fixtures/BaseDrawer';
import { ControlledDrawer } from '../fixtures/ControlledDrawer';
import { HandleDrawer } from '../fixtures/HandleDrawer';
import { InitialSnapDrawer } from '../fixtures/InitialSnapDrawer';
import { NestedDrawers } from '../fixtures/NestedDrawers';
import { NonDismissibleDrawer } from '../fixtures/NonDismissibleDrawer';
import { PersistentDrawer } from '../fixtures/PersistentDrawer';
import { RedirectDrawer } from '../fixtures/RedirectDrawer';
import { ScaledBackground } from '../fixtures/ScaledBackground';
import { TwoDrawers } from '../fixtures/TwoDrawers';

type Fixture = { label: string; Component: () => JSX.Element };

const fixtures: Record<string, Fixture> = {
  base: { label: 'Base drawer', Component: () => <BaseDrawer /> },
  'base-default-open': { label: 'Base drawer (defaultOpen)', Component: () => <BaseDrawer defaultOpen /> },
  controlled: { label: 'Controlled', Component: () => <ControlledDrawer /> },
  'initial-snap': { label: 'Initial snap', Component: () => <InitialSnapDrawer /> },
  'with-handle': { label: 'With handle', Component: () => <HandleDrawer /> },
  nested: { label: 'Nested drawers', Component: () => <NestedDrawers /> },
  'non-dismissible': { label: 'Non-dismissible', Component: () => <NonDismissibleDrawer /> },
  persistent: { label: 'Persistent peek bar', Component: () => <PersistentDrawer /> },
  'with-redirect': { label: 'With redirect', Component: () => <RedirectDrawer /> },
  'with-scaled-background': { label: 'Scaled background', Component: () => <ScaledBackground /> },
  'two-drawers': { label: 'Two drawers (top + bottom)', Component: () => <TwoDrawers /> },
};

function Index() {
  return (
    <div
      style={{
        padding: 32,
        fontFamily: 'system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        maxWidth: 480,
        margin: '0 auto',
      }}
    >
      <h1 style={{ marginBottom: 8 }}>Vaul fixtures</h1>
      <p style={{ color: '#666', marginTop: 0 }}>
        Click a fixture to render it. Edit any file under tests/ for hot reload.
      </p>
      {Object.entries(fixtures).map(([key, { label }]) => (
        <a
          href={`#${key}`}
          key={key}
          style={{
            padding: '12px 16px',
            border: '1px solid #ddd',
            borderRadius: 8,
            textDecoration: 'none',
            color: '#222',
          }}
        >
          {label}
        </a>
      ))}
    </div>
  );
}

function BackLink() {
  return (
    <button
      onClick={() => {
        window.location.hash = '';
      }}
      style={{
        position: 'fixed',
        top: 8,
        left: 8,
        zIndex: 9999,
        background: '#000',
        color: '#fff',
        padding: '4px 10px',
        border: 0,
        borderRadius: 4,
        fontSize: 12,
        fontFamily: 'system-ui, sans-serif',
        cursor: 'pointer',
      }}
      type='button'
    >
      &lt;- back
    </button>
  );
}

function App() {
  const [hash, setHash] = useState(() => window.location.hash.slice(1));

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash.slice(1));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (!hash) {
    return <Index />;
  }

  const fixture = fixtures[hash];
  if (!fixture) {
    return <Index />;
  }

  const { Component } = fixture;
  return (
    <>
      <BackLink />
      <Component />
    </>
  );
}

const container = document.getElementById('root');
if (!container) {
  throw new Error('No #root element');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
