const path = require('path');

module.exports = {
  entry: './src/report/report.tsx', // Changed to .tsx for React
  mode: 'production',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist/report'),
    filename: 'report.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'] // Added .tsx and .jsx
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Handle both .ts and .tsx files
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
              strict: true,
              jsx: 'react', // Enable JSX support
              lib: ["es2015", "dom", "dom.iterable"]
            }
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // Injects styles into DOM
          'css-loader',   // Translates CSS into CommonJS
          'sass-loader'   // Compiles Sass to CSS
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  externals: {
    // Don't bundle these - they'll be provided by Azure DevOps
    "azure-devops-extension-sdk": "SDK",
    "azure-devops-extension-api": "API"
  }
};