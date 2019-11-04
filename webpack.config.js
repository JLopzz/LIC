const path = require('path');

var BUILD_DIR = path.resolve(__dirname, './public/resources');
var APP_DIR = path.resolve(__dirname, './src');

module.exports = {
  mode: 'development',
  //devtool: 'source-map',
  resolve: { extensions: ['.ts', '.tsx', '.js', 'jsx', '.json'] },
  entry: { app: APP_DIR + '/index.tsx' },
  output: { path: BUILD_DIR, filename: '[name].js', },
  module: {
    rules: [
      {
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
      }],
  },
};
