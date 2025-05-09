const path = require('path');

module.exports = {
  entry: './src/report/report.ts',
  mode: 'production',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist/report'),
    filename: 'report.js'
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
  }
};