import { defineConfig } from '@rstest/core';

import { withRslibConfig } from '@rstest/adapter-rslib';
import type { BrowserContextOptions, LaunchOptions } from 'playwright';

type PlaywrightProviderOptions = {
  launch?: LaunchOptions;
  context?: BrowserContextOptions;
};

// providerOptions must be identical across browser-mode projects in one rstest invocation, so per-project differences
// live in `browser.viewport` only.
const sharedProviderOptions = {
  context: {
    hasTouch: true,
    isMobile: true,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
  },
} satisfies PlaywrightProviderOptions;

const browserBase = {
  enabled: true as const,
  provider: 'playwright' as const,
  browser: 'chromium' as const,
  providerOptions: sharedProviderOptions,
};

const include = ['tests/**/*.test.{ts,tsx}'];

export default defineConfig({
  testTimeout: 10_000,
  projects: [
    {
      extends: withRslibConfig(),
      name: 'iphone',
      include,
      browser: { ...browserBase, viewport: { width: 390, height: 844 } },
    },
    {
      extends: withRslibConfig(),
      name: 'pixel',
      include,
      browser: { ...browserBase, viewport: { width: 393, height: 851 } },
    },
    {
      extends: withRslibConfig(),
      name: 'desktop',
      include,
      browser: { ...browserBase, viewport: { width: 1280, height: 720 } },
    },
  ],
});
