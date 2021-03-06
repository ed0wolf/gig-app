const path = require('path');
module.exports = {
  entry: path.resolve('./src/client/index.js'),
  output: {
    path: path.resolve('./src/static/js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loaders: [ 'style-loader', 'css-loader' ] }
    ]
  }
}