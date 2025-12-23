const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './assets/js/script.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs'), // carpeta final para GitHub Pages
    publicPath: '', // paths relativos correctos
    clean: true, // limpia docs antes de cada build
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], // CSS incluido en bundle
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        type: 'asset/resource',
        generator: { filename: 'img/[name][ext]' }, // copia imágenes a docs/img/
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './assets/img/favicon.ico', // favicon copiado a docs/
    }),
    new Dotenv(), // si usas variables de entorno
  ],
  devtool: 'source-map', // para debug
};
