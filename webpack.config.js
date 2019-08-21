const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "app/src/client/index.jsx"),
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "client.js",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "app/src/client/index.html")
        })
    ]
};
