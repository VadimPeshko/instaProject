const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/js/App.js'],
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js'],
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 3030,
    historyApiFallback: true,
    // contentBase: path.join(__dirname, 'src'),
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/assets/**/*.*'),
        to: path.resolve(__dirname, 'dist/assets'),
      },
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ],
          },
        },
      },
    ],
  },
};
