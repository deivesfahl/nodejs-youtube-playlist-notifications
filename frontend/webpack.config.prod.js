const { merge } = require('webpack-merge');

const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                    keep_fnames: true,
                },
                extractComments: false,
            }),
        ],
    },
    plugins: [
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                    plugins: [
                        ['gifsicle', { interlaced: true }],
                        ['jpegtran', { progressive: true }],
                        ['optipng', { optimizationLevel: 5 }],
                        [
                            'svgo',
                            {
                                plugins: [
                                    {
                                        name: 'removeViewBox',
                                        active: false,
                                    },
                                ],
                            },
                        ],
                    ],
                },
            },
        }),
    ],
});
