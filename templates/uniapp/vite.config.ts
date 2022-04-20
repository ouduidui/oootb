import path from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import { presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  plugins: [
    Components({
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
    }),

    Unocss({
      presets: [
        presetUno(),
      ],
      transformers: [transformerDirectives(), transformerVariantGroup()],
    }),

    AutoImport({
      imports: [
        'vue',
        'uni-app',
      ],
      dts: './src/auto-imports.d.ts',
    }),

    uni(),
  ],
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      'router/': `${path.resolve(__dirname, 'src/router')}/`,
      'components/': `${path.resolve(__dirname, 'src/components')}/`,
      'pages/': `${path.resolve(__dirname, 'src/pages')}/`,
    },
  },
})
