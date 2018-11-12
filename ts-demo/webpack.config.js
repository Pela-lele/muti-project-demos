const path = require('path');

module.exports = {
    mode: "development",
    entry: './src/index.ts',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
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
        host: '127.0.0.1',
        port: '8080',
        open: true,
        quiet: true,
        publicPath: '/'
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
}