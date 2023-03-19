// https://webpack.js.org/plugins/html-webpack-plugin/
const HtmlWebpackPlugin = require('html-webpack-plugin');
// https://github.com/arthurbergmz/webpack-pwa-manifest/blob/master/README.md
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
// https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin/
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    }, // Add and configure workbox plugins for a service worker and manifest file. https://webpack.js.org/guides/asset-management/#loading-images
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'PWA - Text Editor'
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Personal Text Editor',
        short_name: 'jate-pwa',
        description: 'PWA as a Text Editor for online or offline purposes.',
        background: '#272822',
        theme_color: '#31a9e1',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ], // Add CSS loaders and babel to webpack.  js files https://webpack.js.org/loaders/babel-loader/
    module: {
      rules: [
        { // regex css file type
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {// regex js file type
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ["@babel/plugin-proposal-object-rest-spread", "@babel/transform-runtime"]
              }
          }
        }
      ],
    },
  };
};