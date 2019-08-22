const path = require("path");
const glob = require('glob');
const APP_FOLDER = path.resolve(__dirname, "./app");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = () => {
  const alias = {};
  const files = glob.sync(`${APP_FOLDER}/src/*`);
  for(let x = 0; x < files.length; x++){
     const temp = files[x].split('/');
     alias[`app/${temp[temp.length - 1]}`] = files[x]
  }
    const resolve = {
        alias,
        extensions: [".js", ".jsx", ".json"],
        mainFiles: ["index.js", "index.jsx"]
  };
    const loaders = {
        client: [
            {
                test: /\.jsx?$/,
                include: [path.resolve(`${APP_FOLDER}/src`)],
                exclude: [
                    path.resolve(`${APP_FOLDER}/src/client/index.jsx`),
                    path.resolve(`${APP_FOLDER}/src/server/index.jsx`)
                ],
                loader: "eslint-loader",
                enforce: "pre",
                options: {
                    fix: true,
                    failOnError: true,
                    failOnWarning: true
                }
            },
            {
                test: /\.jsx?$/,
                loader: "babel-loader"
            },
            {
              test: /\.(png|jpe?g|gif|svg)$/i,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[name][hash].[ext]',
                    outputPath: 'images',
                  }
                },
              ],
            }, {
              test: /\.s[ac]ss$/i,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                      publicPath: '../'
                  }
              },
              {  loader: 'css-loader',
              options: {
                modules: {
 
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
              }},
           
           
                {
                  loader: 'sass-loader',
                  options: {
                    implementation: require('sass')
                  },
                },
              ],
            },
   
  
    ],
        server: [
      {
                test: /\.jsx?$/,
                include: [path.resolve(`${APP_FOLDER}/src`)],
        exclude: [
                    path.resolve(`${APP_FOLDER}/src/client/index.jsx`),
                    path.resolve(`${APP_FOLDER}/src/server/index.jsx`)
        ],
                loader: "eslint-loader",
        enforce: "pre",
                options: {
                    fix: true,
                    failOnError: true,
                    failOnWarning: true
        }
            },
            {
                test: /\.jsx?$/,
                loader: "babel-loader"
            }, 
            {
              test: /\.(png|jpe?g|gif|svg)$/i,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[name][hash].[ext]',
                    outputPath: 'images',
                  }
                },
              ],
            }, {
              test: /\.s[ac]ss$/i,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                      publicPath: '../'
                  }
              },
              {  loader: 'css-loader',
              options: {
                modules: {
              
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
              }},
           
                {
                  loader: 'sass-loader',
                  options: {
                    implementation: require('sass')
                  },
                },
              ],
            },
            
        ]
  };

  const config = [
    {
            name: "client",
            target: "web",
            entry: {
                client: ["@babel/polyfill", `${APP_FOLDER}/src/client/index.jsx`]
            },
            output: {
                filename: "[name].js",
                publicPath: "/scripts/",
                path: `${APP_FOLDER}/compiled/scripts`
            },
            module: {
                      rules: loaders.client
            },
            resolve,    
            plugins: [
              new MiniCssExtractPlugin({
                filename: '../styles/[name].css'
              })
            ]
        },
        {
            name: "server",
            target: "node",
            entry: {
                server: ["@babel/polyfill", `${APP_FOLDER}/src/server/index.jsx`]
            },
            output: {
                filename: "[name].js",
                path: `${APP_FOLDER}/compiled`
            },
            module: {
                rules: loaders.server
            },
            resolve,
            externals: [nodeExternals()],
            plugins: [
              new MiniCssExtractPlugin({
                filename: '[name].css'
              })
            ]
        }
  ];

  return config;

};
