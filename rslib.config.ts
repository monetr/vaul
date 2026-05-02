import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    tsconfigPath: './tsconfig.json',
  },
  lib: [
    {
      format: 'esm',
      bundle: false,
      dts: { autoExtension: true },
    },
  ],
  output: {
    target: 'web',
    cleanDistPath: true,
  },
  plugins: [pluginReact()],
});
