const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  
  entry: './assets/js/script.js',

  
  output: {
    filename: 'bundle.js',               
    path: path.resolve(__dirname, 'dist'),
  },

 
  mode: 'development',

  module: {
    rules: [
      
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]',
        },
      },
    ],
  },

  plugins: [
    new Dotenv(), 
  ],

  
  devtool: 'source-map',
};
