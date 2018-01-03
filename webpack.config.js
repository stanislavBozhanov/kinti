const webpack = require('webpack');


module.exports = {
    // webpack options
    // webpackMiddleware takes a Compiler object as first parameter
    // which is returned by webpack(...) without callback.
    devtool: 'inline-source-map',
    entry: {
        main: [
            'react-hot-loader/patch',
            './src/index.jsx',
            'webpack-hot-middleware/client',
        ],
    },
    output: {
        path: '/',
        publicPath: '/assets/',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        ['es2015', {'modules': false}],
                        'react',
                        'stage-2',
                    ],
                    plugins: [
                        'react-hot-loader/babel',
                    ],
                },
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
}
