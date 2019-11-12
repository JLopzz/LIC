const path = require('path');

var SRC_DIR = path.resolve(__dirname, './src');
var BUILD_DIR = path.resolve(__dirname, './public/resources');

module.exports = {
  mode: 'development',
  //devtool: 'source-map',
  resolve: { extensions: ['.ts', '.tsx', '.js', 'jsx', '.json'] },
  entry: {
    app: SRC_DIR + '/app.tsx',
    admin: SRC_DIR + '/admin.tsx'
  },
  output: { path: BUILD_DIR, filename: '[name].js', },
  module: {
    rules: [{
      test: /\.(js|jsx|ts|tsx)?$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(css|scss)$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'sass-loader', }
      ],
    }, {
      test: /\.(png|jpg|jpeg|gif)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }]
    }],
  },
};
