const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const FederationModuleIdPlugin = require("webpack-federation-module-id-plugin");
const FederationStatsPlugin = require("webpack-federation-stats-plugin");
const path = require('path');

module.exports = {
  entry: './src/index',
  resolve: { extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'] },
  mode: 'development',
  devServer: {
    port: 3002,
  },
  output: {
      path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
    ],
  },
  plugins: [
    new FederationStatsPlugin(),
    new FederationModuleIdPlugin(),
    // To learn more about the usage of this plugin, please visit https://webpack.js.org/plugins/module-federation-plugin/
    new ModuleFederationPlugin({
      name: 'guests',
      filename: 'remoteEntry.js',
      exposes: {
        './Header': './src/Header',
      },
      shared: { react: { singleton: true } },
    })
  ],
};
