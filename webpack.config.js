const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/task/task.ts',
  mode: 'production',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist/task'),
    filename: 'task.js'
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
            transpileOnly: true,
            compilerOptions: {
              module: 'commonjs',
              target: 'es2015',
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
    new CopyPlugin({
      patterns: [
        { 
          from: 'src/task/task.json', 
          to: 'task.json' 
        }
      ]
    })
  ]
};