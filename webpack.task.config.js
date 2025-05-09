// webpack.task.config.js
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/task/task.ts', // Entry point for your task
  mode: 'production',           // Or 'development' for easier debugging
  target: 'node',               // Important: Specifies that the bundle is for Node.js
  output: {
    path: path.resolve(__dirname, 'dist/task'), // Output directory
    filename: 'task.js',                        // Output filename
    libraryTarget: 'commonjs2', // Ensures compatibility with Node.js module system for tasks
  },
  resolve: {
    extensions: ['.ts', '.js'], // Resolve these extensions
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            // You can point to a separate tsconfig.task.json or override options here.
            // Overriding options ensures this Webpack config is self-contained for the task.
            compilerOptions: {
              module: 'commonjs',     // For Node.js environment
              target: 'es2021',       // Compatible with Node 20.x (Node 20 supports ES2022/ES2023 features, ES2021 is safe)
              declaration: false,     // No need for .d.ts files in the bundled task
              esModuleInterop: true,  // Recommended for interop with CommonJS/ES modules
              skipLibCheck: true,     // Speeds up compilation
              strict: true,           // Enforce strict type-checking
              // 'outDir' and 'rootDir' are handled by Webpack's output.path, so not needed here.
            }
            // If you prefer a separate tsconfig for the task:
            // configFile: 'tsconfig.task.json'
          }
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/task/task.json', to: 'task.json' } // Copies task.json to dist/task/
      ]
    })
  ],
  // Dependencies like 'axios' and 'azure-pipelines-task-lib' will be bundled by webpack.
  // This is generally fine for custom Node handlers.
  // If VSIX size is a major concern for azure-pipelines-task-lib, it *could* be marked as external,
  // but bundling is often safer to avoid version mismatches on the agent.
  // For 'azure-pipelines-task-lib', it's usually provided by the agent, so making it external is common.
  // However, for custom handlers, bundling everything except Node built-ins is sometimes simpler.
  // Let's keep it bundled for now, as 'azure-pipelines-task-lib' is also in your `dependencies` in package.json.
  // If you wanted to make it external (relying on the agent's version):
  // externals: {
  //   'azure-pipelines-task-lib/task': 'commonjs azure-pipelines-task-lib/task',
  //   // You might need to list other sub-modules if used directly
  // },
  stats: {
    warnings: false // Optional: Suppress less critical warnings during build
  }
};