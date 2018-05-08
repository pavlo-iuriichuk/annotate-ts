import { TsConfigPathsPlugin } from 'awesome-typescript-loader';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
import * as path from 'path';

const isProduction = process.env.NODE_ENV === 'production';
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

  devtool: isProduction ? 'source-map' : 'eval-source-map',

  mode: isProduction ? 'production' : 'development',

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
  plugins: [
      new TsConfigPathsPlugin(),
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 5,
          mangle: true
        },
        include: /\.min\.js$/,
      })
  ]
};