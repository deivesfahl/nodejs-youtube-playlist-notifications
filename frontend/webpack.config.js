const path = require('path');

const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin').default;
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'css/app': ['./src/assets/css/reset.css', './src/assets/css/style.css'],
        'js/app': './src/assets/js/App.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[contenthash].js',
        clean: {},
    },
    resolve: {
        extensions: ['.js'],
    },
    optimization: {
        emitOnErrors: false,
    },
    plugins: [
        new Dotenv({
            path: '../.env',
        }),
        new RemoveEmptyScriptsPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/views/index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                type: 'asset',
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: (url, resourcePath) => {
                                if (/images\\icons/.test(resourcePath)) {
                                    return `images/icons/${url}`;
                                }

                                return `images/${url}`;
                            },
                        },
                    },
                ],
            },
        ],
    },
};
