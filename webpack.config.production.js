const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './client/scripts/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/scripts'),
    publicPath: '/scripts/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'client/assets/',
        to: path.resolve(__dirname, 'public/assets/'),
      },
    ]),
  ],
};
