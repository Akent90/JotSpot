const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: path.resolve(__dirname, 'src', 'js', 'index.js'),
      install: path.resolve(__dirname, 'src', 'js', 'install.js'),
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'),
        title: 'JATE'
      }),
      new InjectManifest({
        swSrc: path.resolve(__dirname, 'src-sw.js'),
        swDest: 'service-worker.js',
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Just Another Text Editor',
        background_color: '#ffffff',
        theme_color: '#317EFB',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons')
          }
        ]
      })                                                                                                                                                                                                                                                                                                                 
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules | bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread']
            }
          }
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[hash][ext][query]'
          }
        }
      ],
    },
  };
};