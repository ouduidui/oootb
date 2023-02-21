import * as esbuild from 'esbuild'

(async function() {
  await esbuild.build({
    bundle: true,
    entryPoints: ['./lib/index.ts'],
    outfile: './dist/index.cjs',
    format: 'cjs',
    platform: 'node',
    target: 'node14',
    watch: true,
    sourcemap: true,
  })
})()
