
process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        filename: 'assets/js/[name].[chunkhash:7].js',
        chunkFilename: 'assets/js/[name].[chunkhash:7].js'
    },
    plugins:[
        new CleanWebpackPlugin(['dist'],{
            root:path.resolve(__dirname, '../')
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     favicon: '',
        //     template: path.resolve(__dirname, '../src/index.html'),
        //     inject: true
        // }),
        new webpack.BannerPlugin('Pela版权所有！')
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                },
                commons: {
                    // async 设置提取异步代码中的公用代码
                    chunks: "async",
                    name: 'commons-async',
                    /**
                     * minSize 默认为 30000
                     * 想要使代码拆分真的按照我们的设置来
                     * 需要减小 minSize
                     */
                    minSize: 0,
                    // 至少为两个 chunks 的公用代码
                    minChunks: 1
                }
            }
        },
        /**
         * 对应原来的 minchunks: Infinity
         * 提取 webpack 运行时代码
         * 直接置为 true 或设置 name
         */
        runtimeChunk: {
            name: 'manifest'
        },
        minimizer:[
            new UglifyJsPlugin({
                cache:true
            })
        ]
        
    }
})