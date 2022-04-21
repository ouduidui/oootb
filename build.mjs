import * as esbuild from 'esbuild'

(async function() {
  await esbuild.build({
    bundle: true,
    minify: true,
    entryPoints: ['./index.js'],
    outfile: './index.cjs',
    format: 'cjs',
    platform: 'node',
    target: 'node14',
  })
})()
