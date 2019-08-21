const path = require("path");
const APP_FOLDER = path.resolve(__dirname, "./app");
const nodeExternals = require("webpack-node-externals");

module.exports = () => {
    const alias = {};
    const resolve = {
        alias,
        extensions: [".js", ".jsx", ".json"],
        mainFiles: ["index.js", "index.jsx"]
    };
    const loaders = {
        client: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader"
            }
        ],
        server: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader"
            }
        ]
    };

    const config = [
        {
            name: "client",
            target: "web",
            entry: {
                client: [
                    "@babel/polyfill",
                    `${APP_FOLDER}/src/client/index.jsx`
                ]
            },
            output: {
                filename: "[name].js",
                publicPath: "/scripts/",
                path: `${APP_FOLDER}/compiled/scripts`
            },
            module: {
                rules: loaders.client
            },
            resolve
        },
        {
            name: "server",
            target: "node",
            entry: {
                server: [
                    "@babel/polyfill",
                    `${APP_FOLDER}/src/server/index.jsx`
                ]
            },
            output: {
                filename: "[name].js",
                path: `${APP_FOLDER}/compiled`
            },
            module: {
                rules: loaders.server
            },
            resolve,
            externals: [nodeExternals()]
        }
    ];

    return config;
    // entry: path.resolve(__dirname, "app/src/client/index.jsx"),
    // mode: "development",
    // output: {
    //     path: path.resolve(__dirname, "dist"),
    //     filename: "client.js",
    //     libraryTarget: "umd"
    // },
    // module: {
    //     rules: [
    //         {
    //             test: /\.jsx?$/,
    //             loader: "babel-loader"
    //         },
    //         {
    //             test: /\.html$/,
    //             use: [
    //                 {
    //                     loader: "html-loader"
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // plugins: [
    //     new HtmlWebPackPlugin({
    //         template: path.resolve(__dirname, "app/src/client/index.html")
    //     })
    // ]
};
