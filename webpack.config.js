var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
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
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        loaders: ["style", "css", "less"]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  devServer: {
    contentBase: "./",
    port: 8888
    // noInfo: true
  }
};


// When inside Redux repo, prefer src to compiled version.
// You can safely delete these lines in your project.
// var reduxSrc = path.join(__dirname, '..', '..', 'src');
// var reduxNodeModules = path.join(__dirname, '..', '..', 'node_modules');
// var fs = require('fs');
// if (fs.existsSync(reduxSrc) && fs.existsSync(reduxNodeModules)) {
//   // Resolve Redux to source
//   module.exports.resolve = { alias: { 'redux': reduxSrc } }
//   // Compile Redux from source
//   module.exports.module.loaders.push({
//     test: /\.js$/,
//     loaders: [ 'babel' ],
//     include: reduxSrc
//   });
// }
