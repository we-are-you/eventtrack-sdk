import { build } from 'esbuild'
import { rm } from 'fs/promises'

// Clean dist folder
await rm('./dist', { recursive: true, force: true })

// Build ESM
await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  format: 'esm',
  outfile: 'dist/esm/index.js',
  sourcemap: true,
  platform: 'neutral',
  external: [],
})

// Build CJS
await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  format: 'cjs',
  outfile: 'dist/cjs/index.js',
  sourcemap: true,
  platform: 'neutral',
  external: [],
})
