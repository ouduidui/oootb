import * as esbuild from 'esbuild'

(async function() {
  await esbuild.build({
    bundle: true,
    minify: true,
    entryPoints: ['./lib/index.ts'],
    outfile: './dist/index.cjs',
    format: 'cjs',
    platform: 'node',
    target: 'node14',
    treeShaking: true,
  })
})()
