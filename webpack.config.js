/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
// const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: {
        client: './src/client/scripts/index.ts',
        server: './src/server.ts',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    mode: 'development',
    target: 'node',
    // externals: [nodeExternals()],
    watch: true,
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [{
                test: /\.ts$/,
                use: [
                    'ts-loader'
                ]
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/client/pages', 'index.html'),
        filename: 'index.html',
    }), ]
}