const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/task/task.ts',
  mode: 'production',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist/task'),
    filename: 'task.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              module: 'commonjs',
              target: 'es2021',
              declaration: false,
              esModuleInterop: true,
              skipLibCheck: true,
              strict: true
            }
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/task/task.json', to: 'task.json' }
      ]
    })
  ],
  stats: {
    warnings: false
  }
};