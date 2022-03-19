import * as esbuild from 'esbuild'

await esbuild.build({
  bundle: true,
  minify: true,
  entryPoints: ['./lib/index.js'],
  outfile: './bin/index.js',
  format: 'cjs',
  platform: 'node',
  target: 'node14',
})
