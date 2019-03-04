const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  target: 'web',
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.build.json',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bara.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
