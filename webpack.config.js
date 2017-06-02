import path from 'path';
import webpack from 'webpack';
module.exports = {
  entry: ['react-hot-loader/patch',
        path.join(__dirname, 'src/index'),
        'webpack-dev-server/client?http://localhost:9487',
        'webpack/hot/only-dev-server'
  ],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'output/assets'),
    publicPath: '/assets'
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [{
      test: /.js$/,
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'bower_components')
      ],
      loader: 'babel-loader'
    }]
  },
  // resolve: {
  //   extensions: ['.json', '.js', '.jsx', '.css']
  // },
  devtool: 'source-map'
};