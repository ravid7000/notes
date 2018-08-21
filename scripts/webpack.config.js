const path = require('path')
const autoprefixer = require('autoprefixer')
const { HotModuleReplacementPlugin } = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ProgressPlugin = require('progress-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isProd = process.argv.includes('--prod')
const reImage = /\.(bmp|gif|jpe?g|png|svg)$/;

if (isProd) {
  process.env.BABEL_ENV = 'production'
  process.env.NODE_ENV = 'production'
} else {
  process.env.BABEL_ENV = 'development'
  process.env.NODE_ENV = 'development'
}

module.exports = {
  devServer: {
    contentBase: [path.resolve('public'), path.resolve('build')],
    compress: true,
    port: 9000
  },
  context: path.resolve(__dirname, '../'),
  mode: process.env.NODE_ENV,
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve('build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: [/\.scss$/, /\.sass$/],
        use: [
          isProd ?
              MiniCssExtractPlugin.loader :
              'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true
            },
          },
          {
            loader: 'sass-loader',
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          }
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: isProd ?
              MiniCssExtractPlugin.loader :
              'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          }
        ]
      },
      {
        test: reImage,
        oneOf: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          },
          {
            loader: 'file-loader',
            options: {
              name: 'static/images/[name].[ext]',
            }
          },
        ],
      },
      {
        exclude: [
          /\.(js|jsx|mjs)$/,
          reImage,
          /\.scss$/,
          /\.sass$/,
          /\.css$/,
          /\.html$/,
          /\.json$/
        ],
        loader: 'file-loader',
        options: {
          name: 'static/[name].[ext]',
        },
      }
    ]
  },
  plugins: [
    new OptimizeCSSAssetsPlugin({}),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebPackPlugin({
      template: './public/index.html'
    }),
    new HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(
      ['build'],
      {
        root: process.cwd()
      }
    ),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:9000/'
    }, {
      reload: false
    }),
    new CopyWebpackPlugin([
      {
        from: 'public/assets',
        to: 'assets'
      },
      {
        from: 'public/images',
        to: 'images'
      },
      {
        from: 'public/manifest.json',
        to: 'manifest.json'
      },
      {
        from: 'public/sw.js',
        to: 'sw.js'
      },
    ]),
    new ProgressPlugin(true)
  ]
}