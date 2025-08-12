const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
       tabContent: "./src/tabContent.tsx",
    },
    mode: 'production',
    target: 'web',
    
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "azure-devops-extension-sdk": path.resolve("node_modules/azure-devops-extension-sdk")
        },
        fallback: {
            "url": false,
            "path": false,
            "fs": false
        }
    },
    
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: false  // CRITICAL: Don't clean to preserve task build output
    },
    
    stats: {
        warnings: false
    },
    
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                        compilerOptions: {
                            target: "es2018",
                            module: "es2015"
                        }
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", 
                    "css-loader", 
                    "azure-devops-ui/buildScripts/css-variables-loader", 
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: '[name][ext]'
                }
            },
            {
                test: /\.html$/,
                type: 'asset/resource',
                generator: {
                    filename: '[name][ext]'
                }
            }
        ]
    },
    
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/tabContent.html", to: "tabContent.html" }
            ]
        })
    ],

    optimization: {
        minimize: true
    }
};