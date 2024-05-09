const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Require the GenerateSW class of the WorkBoxPlugin 
const { GenerateSW } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      cards: './src/js/cards.js'
    },

    // TODO: Add the correct output
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      
    },

    // TODO: Add the correct plugins
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
      }),

      new GenerateSW(),
      new WebpackPwaManifest({
        // TODO: Create a manifest.json:
        name: 'My Progressive Web App',
    short_name: 'MyPWA',
    description: 'JJ Mini Project',
    background_color: '#ffffff',
    crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
    start_url:'./', //whatever the root is
    publicPath: './',
    icons: [
      {
        src: path.resolve('./src/images/logo.png'),
        sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
      },
      {
        src: path.resolve('./src/images/logo.png'),
        size: '1024x1024' // you can also use the specifications pattern
      },
      {
        src: path.resolve('./src/images/logo.png'),
        size: '1024x1024',
        purpose: 'maskable'
      }
    ]
      }),

     
    ],

    // TODO: Add the correct modules
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
        
      ],

    }
  };
};
