const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


const devMode = process.env.NODE_ENV !== 'production'
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist/')
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: 'static',
                ignore: ['.*']
            }
        ]),
        new MiniCssExtractPlugin({
            filename: "assets/css/[name].[hash].css",
            // chunkFilename: "[name]-[hash:7].css"
        }),
        
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "../src"),
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [{
                    // loader: 'style-loader'
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../../'
                    }
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[name]_[local]-[hash:5]'
                    }
                }]
            },
            // {
            //     test: /^(.*\.global)\.scss$/,
            //     use: [{
            //         loader: MiniCssExtractPlugin.loader,
            //     }, {
            //         loader: 'css-loader'
            //     }, {
            //         loader: 'postcss-loader',
            //         options: {// 如果没有options这个选项将会报错 No PostCSS Config found
            //             plugins: (loader) => [
            //                 require('autoprefixer')({
            //                     browsers: ['last 5 versions']
            //                 }),
            //             ]
            //         }
            //     },{
            //         loader: 'sass-loader'
            //     }],
            //     exclude:[path.resolve(__dirname, '../', 'node_modules')]
            // },
            {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[name]_[local]-[hash:5]'
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {// 如果没有options这个选项将会报错 No PostCSS Config found
                        plugins: (loader) => [
                            require('autoprefixer')({
                                browsers: ['last 5 versions']
                            }),
                        ]
                    }
                },{
                    loader: 'sass-loader'
                }],
                exclude:[path.resolve(__dirname, '../', 'node_modules')]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: '8192',
                        name: 'assets/img/[name].[hash:7].[ext]'
                    }
                }]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: '8192',
                        name: 'assets/media/[name].[hash:7].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: '8192',
                        name: 'assets/fonts/[name].[hash:7].[ext]'
                    }
                }]
            },
            {
                test: /\.art\.html$/,
                loader: 'art-template-loader',
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', 'scss', 'css', '.art.html'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    }
}