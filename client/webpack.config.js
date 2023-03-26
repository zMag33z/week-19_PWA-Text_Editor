// https://webpack.js.org/plugins/html-webpack-plugin/
const HtmlWebpackPlugin = require('html-webpack-plugin');
// https://github.com/arthurbergmz/webpack-pwa-manifest/blob/master/README.md
const WebpackPwaManifest = require('webpack-pwa-manifest');
// https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin/
const { InjectManifest } = require('workbox-webpack-plugin');
const path = require('path');


console.log('PATH- files to dist folder', __dirname);

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
    }, // Add and configure workbox plugins for a service worker and manifest file. 
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E.',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'jate - pwa',
        short_name: 'jate-pwa',
        description: 'Just another text editor.',
        background: '#272822',
        theme_color: '#31a9e1',
        start_url: '/',
        publicPath: '/',
        icons: [
          { // https://webpack.js.org/guides/asset-management/#loading-images  hmm?  https://docusaurus.io/docs/next/api/plugins/@docusaurus/plugin-pwa
            src: path.resolve('src/images/logo.png'),
            type: 'image/png',
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
              },
          },
        },
      ],
    },
  };
};