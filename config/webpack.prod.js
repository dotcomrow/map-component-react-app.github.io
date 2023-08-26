const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const ExternalRemotesPlugin = require('external-remotes-plugin');

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: 'auto',
    },
    devServer: {
        // port: 8081,
        historyApiFallback: true,
    },
    optimization: {
        minimize: true,
        runtimeChunk: true,
        splitChunks: false
    },
    plugins: [
        { // anonymous plugin
            apply(compiler) {
              compiler.hooks.beforeRun.tapAsync('MyCustomBeforeRunPlugin', function(compiler, callback) {
                // debugger
                console.dir(compiler.options)
                callback()
              })
            },
        },
        new ModuleFederationPlugin({
            name: 'map_component',
            filename: 'remoteEntry.js',
            exposes: {
                './MapContent': './src/MapContent.jsx'
            },
            shared: {
                ...packageJson.dependencies,
                react: {
                    singleton: true,
                    requiredVersion: packageJson.dependencies.react,
                    eager: true
                },
                'react-dom': {
                    singleton: true,
                    eager: true,
                    requiredVersion: packageJson.dependencies['react-dom'],
                },
                'react-router-dom': {
                    singleton: true,
                    eager: true,
                    requiredVersion: packageJson.dependencies['react-router-dom'],
                },
                bootstrap: {
                    singleton: true,
                    eager: true,
                    requiredVersion: packageJson.dependencies.bootstrap,
                },
            }
        }),
        new ExternalRemotesPlugin()
    ],
};

module.exports = (env) => merge(commonConfig(env), prodConfig);