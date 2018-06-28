// requires
const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

// paths
const root = path.resolve();
const srcRoot = `${root}/src`;
const assetsRoot = `${srcRoot}/entries`;
const distRoot = `${root}/dist`;


// modules and their entry points
const modules = {
    critical:        `${assetsRoot}/critical/index.js`,
    home:        `${assetsRoot}/home/index.js`,
    about:        `${assetsRoot}/about/index.js`,
    allPosts:        `${assetsRoot}/allPosts/index.js`,
    archive:        `${assetsRoot}/archive/index.js`,
    category:        `${assetsRoot}/category/index.js`,
    postDetail:  `${assetsRoot}/postDetail/index.js`
};

let HtmlWebpackPluginPhpTemplates = Object.keys(modules).map((entryName) => {
        return new HtmlWebpackPlugin({
            template: `${srcRoot}/webpack-partial.template.ejs`, //path.resolve(__dirname, "./assets/webpack.template.hbs"),
            filename: `${distRoot}/webpack-bundles/${entryName}.php`,
            chunks: ['inline', entryName]
        })
    });

module.exports = {
    entry: modules,
    output: {
        path: `${distRoot}/assets`,
        publicPath: '/dist/assets'
    },
    resolve: {
        modules: [
            "node_modules"
        ],
        extensions: [".js", ".css"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader?importLoaders=1&minimize=true",
                    "postcss-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|jpg|gif|ico|svg|webp)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: '/[name]-[hash].[ext]',
                }
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new CopyWebpackPlugin([{ from: 'src/images', to: 'images' }]),
        ...HtmlWebpackPluginPhpTemplates
    ]
}