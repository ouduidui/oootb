import type { Options } from 'tsup'
import { defineConfig } from 'tsup'

export default defineConfig(({ watch }: Options) => {
  const __DEV__ = !!watch
  return {
    entry: ['src/index.ts'],
    splitting: false,
    sourcemap: __DEV__,
    clean: true,
    dts: !__DEV__,
    minify: !__DEV__,
    format: ['esm', 'cjs'],
  }
})
