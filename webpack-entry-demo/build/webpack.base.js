const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
//glob在webpack中对文件的路径处理
var glob = require('glob');
const devMode = process.env.NODE_ENV !== 'production'

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}


const webpackConfig = {
    context: path.resolve(__dirname, '../'),
    entry: {},
    output: {
        path: path.resolve(__dirname, '../dist/')
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/static'),
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
                        // modules: true,
                        // localIdentName: '[name]_[local]-[hash:5]'
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, {
                    loader: 'css-loader',
                    options: {
                        // modules: true,
                        // localIdentName: '[name]_[local]-[hash:5]'
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
                }, {
                    loader: 'sass-loader'
                }],
                exclude: [path.resolve(__dirname, '../', 'node_modules')]
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


//封装方法，获取指定路径下的入口文件
function getEntries(globPath) {
    //方法： glob.sync(pattern,[options])；该方法成功后，返回匹配搜索之后的数组，
    //没有匹配返回一个空数组;pattern:'src/pages/**/index.js';这里‘**’匹配模式表示的是
    // 位于src/pages/和/index.js的这两层文件名
    var files = glob.sync(globPath),
        entries = {};
    files.forEach(function (filepath) {
        //取倒数第二层（pages下面的文件夹）做包名
        var split = filepath.split('/');
        var name = split[split.length - 2];
        entries[name] = './' + filepath;
    });
    return entries;
};
//
var entries = getEntries('src/pages/**/index.js');
console.log("entries:", entries)
Object.keys(entries).forEach(function (name) {
    //这里循环输出每一个页面的entry,
    webpackConfig.entry[name] = entries[name];
    //判断是否是登陆页面;因为登陆页面和其他页面是两个不同的模板

    var plugin = new HtmlWebpackPlugin({
        //有模板生成出来的html文件名
        filename: name + '.html',
        template: entries[name].substring(0,entries[name].length-8)+'index.html',
        inject: 'body',
        chunks: ['commons', name]
    })
    webpackConfig.plugins.push(plugin)
})

module.exports = webpackConfig;