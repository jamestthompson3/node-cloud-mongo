const path = require('path')

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/front/src/index.js'],
  output: {
    /* eslint-disable-next-line */
    path: __dirname,
    filename: './src/front/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  resolve: {
    /* eslint-disable-next-line */
    modules: [path.resolve(__dirname, 'src/front/src'), 'node_modules']
  },
  target: 'web'
}
