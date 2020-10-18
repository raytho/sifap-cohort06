/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
   entry: {
      app: path.resolve(__dirname, 'src/index.js'),
   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[hash].js',
      publicPath: './'
   },
   resolve: {
      extensions: ['.js', '.jsx'],
   },
   optimization: {
      minimize: true,
      minimizer: [
         // Este es para minizar más el js
         new TerserJSPlugin(),
         // Este es para minizar aún más el css
         new OptimizeCssAssetsWebpackPlugin()
      ]
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: 'babel-loader',
         },
         {
            test: /\.(s*)css$/,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
               },
               'css-loader',
               'sass-loader',
            ],
         },
         {
         test: /\.(png|jpe?g)/,
         use: [
            {
               loader: 'url-loader',
               options: {
                  name: '[name].[hash].[ext]',
                  outputPath: 'dist/assets/static/',
                  limit: 1000
               },
            },
         ],
         },
      ],
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './public/index.html',
         filename: './index.html'
      }),
      //  Con este plugin leemos en manifest del dll y así podemos usarlo
      new webpack.DllReferencePlugin({
         manifest: require('./modules-manifest.json')
      }),
      new MiniCssExtractPlugin({
         filename: 'assets/styles/[name].[hash].css',
      }),
      // Elimina los archivos antiguos cuando mandamos a production
      new CleanWebpackPlugin({
         cleanOnceBeforeBuildPatterns: ['**/app.*']
      }),
      //  Con este plugin linkeamos en dll al index.html
      new AddAssetHtmlWebpackPlugin({
         filepath:path.resolve(__dirname, 'dist/js/*.dll.js'),
         outputPath:'js',
         publicPath: 'js'
      })
   ]
};