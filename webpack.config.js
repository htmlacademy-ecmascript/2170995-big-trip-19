const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');


const newLocal = 'babel-loader';
module.exports = {
  // Точка входа
  entry: './src/main.js',
  // Директория для сборки
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    // Очистка директории
    clean: true,
  },
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [newLocal]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
