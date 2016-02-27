var path    = require('path');
var webpack = require('webpack');
var ENV     = process.env.ENV || 'development';
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  resolve: {
    alias: {
      env: path.join(__dirname, "app", "assets", "javascripts", "config", "env", ENV)
    }
  },
  entry: [
    // 'webpack-dev-server/client?http://localhost:8888',
    // 'webpack/hot/only-dev-server',
    './app/assets/javascripts/app/index'
  ],
  output: {
    path: __dirname,
    filename: "./app/assets/javascripts/bundle.js"
  },
  plugins: [
    new ExtractTextPlugin('./app/assets/stylesheets/[name].bundle.css')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?name=[path][name].[ext]?limit=100000'
      }
    ]
  },
  devServer: {
    contentBase: "./",
    port: 8888
    // noInfo: true
  }
};
