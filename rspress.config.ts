import path from 'node:path';
import { defineConfig } from '@rspress/core';

// `DOCS_BASE` is set in CI from the `actions/configure-pages` output, so the
// site works under https://<user>.github.io/<repo>/. Empty string means root.
const rawBase = process.env.DOCS_BASE ?? '';
const base = rawBase === '' || rawBase === '/' ? '/' : `${rawBase.replace(/\/$/, '')}/`;

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  outDir: 'docs-dist',
  base,
  title: '@monetr/vaul',
  description: 'Drawer component for React with touch-friendly snap points, scaled background, and nested drawers.',
  route: {
    exclude: ['components/**/*'],
    cleanUrls: true,
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/monetr/vaul' },
      { icon: 'npm', mode: 'link', content: 'https://www.npmjs.com/package/@monetr/vaul' },
    ],
    footer: {
      message: 'MIT Licensed | Copyright (c) Emil Kowalski & monetr LLC',
    },
  },
  builderConfig: {
    resolve: {
      alias: {
        '@monetr/vaul': path.join(__dirname, 'src'),
      },
    },
  },
});
