/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
   entry: {
      modules: [
         'react',
         'react-dom',
         'react-router-dom',
         'classnames',
         'prop-types',
         'react-helmet'
      ]
   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[hash].dll.js',
      library: '[name]'
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
   plugins: [
      new webpack.DllPlugin({
         name: '[name]',
         path: path.resolve(__dirname, '[name]-manifest.json')
      }),
      // Este plugin lo usamos para eliminar los archivos antiguos cada vez que hacen build production
      new CleanWebpackPlugin({
         cleanOnceBeforeBuildPatterns: ['**/modules.*']
      })
   ]
}