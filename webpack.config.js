const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'], /* Where Webpack will start looking for the dependencies to bundle */
    output: { // Where to save or bundle the file.
        path: path.resolve(__dirname, 'dist'), // Join the working dir with the dir we want the bundle to be in.
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist', // Where Webpack should serve our files from.
        writeToDisk: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/, // Test for JS files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};
