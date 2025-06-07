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
    },
    
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
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
                        transpileOnly: true
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
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }]
            },
            {
                test: /\.html$/,
                loader: "file-loader"
            }
        ]
    },
    
    plugins: [
        new CopyWebpackPlugin([
            { from: "src/tabContent.html", to: "tabContent.html" }
        ])
    ]
};