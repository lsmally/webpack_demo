const path = require('path');
const glob = require('glob');
const webpack = require('webpack')
const htmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin')
const entry = require('./webpack_config/entry_webpack.js')

console.log(encodeURIComponent(process.env.type));
if (process.env.type == "build") {
    var website = {
        publicPath: "https://www.lsmally.cn/"
    }
} else {
    var website = {
        publicPath: "http://192.168.0.105:2222/"
    }
}




module.exports = {
    devtool: 'source-map',
    mode: "development",
    entry: entry.path,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: website.publicPath
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    }, {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    }, "postcss-loader"]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, "css-loader", "less-loader"]
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 5000,
                        outputPath: 'images/'
                    }
                }
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: "[id].css"
        }),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html'))
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            vue: 'vue'
        }),
        new copyWebpackPlugin([{
            from: __dirname + '/src/static',
            to: './static'
        }]),
        new webpack.BannerPlugin('lsmally版权所有者'),
        new CleanWebpackPlugin(["dist"])
    ],
    optimization: {
        splitChunks: {
            cacheGroups: { 
                commons: { 
                    test: /common\/|components\//,
                    name: 'page/commons',
                    priority: 10,
                    enforce: true 
                },
                vendor: {
                    test: /node_modules\//,
                    name: 'page/vendor',
                    priority: 10,
                    enforce: true
                }
            }
        },
        runtimeChunk: {
            name: 'page/manifest'
        }
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '192.168.0.105',
        compress: true,
        port: 2222
    }
}