var webpack = require('webpack');

module.exports = {
    entry: "./client_my/main.js",
    output: {
        path: __dirname + '/public/build/',
        publicPath: "build/",
        filename: "bundle.js"
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!autoprefixer-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.jsx$/,
                loader: "react-hot!babel",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    }
};