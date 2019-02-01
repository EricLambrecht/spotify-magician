const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
    filename: '[hash].build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
	        'css-loader',
	        'sass-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
        include: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: file => (
	        /node_modules/.test(file) &&
	        !/\.vue\.js/.test(file)
        ),
      },
      {
        test: /\.(jpg|svg)$/, use: [ "file-loader" ]
      },
      {
        test: /\.png$/, use: [ "url-loader?mimetype=image/png" ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "markdown-loader",
            options: {
              /* your options here */
            }
          }
        ]
      }
    ],
  },
  plugins: [
	  new CleanWebpackPlugin(['dist']),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Spotify Magician',
      template: 'src/index.html',
    }),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  performance: {
    hints: false
  },
};
