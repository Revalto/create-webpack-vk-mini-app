const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { ProvidePlugin, optimize } = require("webpack");

module.exports = {
    mode: "production",
    entry: ["@babel/polyfill", "./src/index.jsx"],
    output: {
        path: path.resolve(__dirname, './build'),
        filename: "[name].[hash].js",
        sourceMapFilename: "[name].[hash].js.map"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        https: true
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(css|less)$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.(jpg|jpeg|png|svg)/,
                use: ["file-loader"]
            }
        ]
    },
    optimization: {
		minimize: true
	},
    plugins: [
        new HTMLWebpackPlugin({ template: "./public/index.html" }),
        new ProvidePlugin({
            process: 'process/browser',
        }),
        new CleanWebpackPlugin()
    ]
}