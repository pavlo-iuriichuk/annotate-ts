import { TsConfigPathsPlugin } from 'awesome-typescript-loader';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
import * as path from 'path';

export default {
  entry: {
    'annotate': './src/index.ts',
    'annotate.min': './src/index.ts'
  },

  output: {
    path: path.resolve(__dirname, '_bundles'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'Annotate',
    umdNamedDefine: true
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  devtool: 'source-map',

  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        query: {
          declaration: false,
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: true,
        include: /\.min\.js$/,
      })
    ]
  },
  plugins: [
      new TsConfigPathsPlugin()
  ]
};