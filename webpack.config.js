import path from 'path'
import { fileURLToPath } from 'url'
//import { CKEditorTranslationsPlugin } from '@ckeditor/ckeditor5-dev-translations'
import { VueLoaderPlugin } from 'vue-loader'
//import { styles } from '@ckeditor/ckeditor5-dev-utils'

const outputPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist')

export default {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.svg$/i,
        use: ['raw-loader']
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,

        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag',
              attributes: {
                'data-cke': true
              }
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              //postcssOptions: styles.getPostCssConfig({
              //  themeImporter: {
              //    themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
              //  },
              //  minify: true
              //})
            }
          }
        ]
      }
    ]
  },
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: outputPath,
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
