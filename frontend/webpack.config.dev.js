const path = require('path');

const { merge } = require('webpack-merge');

const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        client: {
            progress: true,
        },
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
    },
});
