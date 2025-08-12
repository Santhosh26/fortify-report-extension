const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/task/task.ts',
  mode: 'production',
  target: 'node18.1',
  output: {
    path: path.resolve(__dirname, 'dist/task'),
    filename: 'task.js',
    libraryTarget: 'commonjs2',
    clean: false  // CRITICAL: Don't clean to avoid conflicts with tab build
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  externals: {
    'azure-pipelines-task-lib': 'azure-pipelines-task-lib'
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
              target: "es2018",
              module: "commonjs"
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
  },
  optimization: {
    minimize: false
  }
};