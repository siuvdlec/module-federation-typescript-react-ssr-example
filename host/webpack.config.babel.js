import path from 'path'
import nodeExternals from 'webpack-node-externals'
import LoadablePlugin from '@loadable/webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
const { ModuleFederationPlugin } = require('webpack').container;

const DIST_PATH = path.resolve(__dirname, 'public/dist')
const production = process.env.NODE_ENV === 'production'
const development = !production

const getConfig = target => ({
  name: target,
  mode: development ? 'development' : 'production',
  target,
  entry: `./src/client/main-${target}.js`,
  module: {
    rules: [
      {
        test: /\.([jt])sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            caller: { target },
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
  externals:
    target === 'node' ? ['@loadable/component', nodeExternals()] : undefined,

  optimization: {
    runtimeChunk: target !== 'node',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },

  output: {
    path: path.join(DIST_PATH, target),
    filename: production ? '[name]-bundle-[chunkhash:8].js' : '[name].js',
    publicPath: `/dist/${target}/`,
    libraryTarget: target === 'node' ? 'commonjs2' : undefined,
  },
  plugins: [
    new LoadablePlugin(), 
    new MiniCssExtractPlugin(), 
    new ModuleFederationPlugin({
      name: "guests",
      remotes: {
        guests: "guests@http://localhost:3002/remoteEntry.js",
      },
      shared: {react: {singleton: true}, "react-dom": {singleton: true}},
    })
  ],
})

export default [getConfig('web'), getConfig('node')]
