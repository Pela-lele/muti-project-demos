
process.env.NODE_ENV = 'development'

const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    output: {
        filename: 'assets/[name].js',
        chunkFilename: 'assets/[id].js'
    },
    devtool:'eval-source-map',
    devServer: {
        clientLogLevel: 'warning',
        inline: true,
        hot: true,
        overlay: {
            warnings: true,
            errors: true
        },
        progress: true,
        contentBase: false,
        compress: true,
        host: 'localhost',
        port: '8080',
        open: true,
        quiet: true,
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            favicon:'',
            template: path.resolve(__dirname, '../src/index.html'),
            inject: true
        }),
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery:'jquery',
            'window.jQuery':'jquery'
        })
    ]
})