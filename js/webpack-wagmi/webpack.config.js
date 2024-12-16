const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Import the plugin

module.exports = {
  entry: './src/index.js',  // Entry point for your app
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',  // Bundle as CommonJS
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    // Copy the index.html file from src to dist
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/index.html', to: 'index.html' },  // Copy index.html to dist
      ],
    }),
  ],
  devServer: {
    static: './dist',  // Serve files from the 'dist' folder
    open: true,        // Open the browser automatically
  },
};
