const path = require("path");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === "production";
console.log("NODE_ENV: ", process.env.NODE_ENV);
const dist = "dist";

const fileName = (ext) => isProd
  ? `bundle.[hash].${ext}`
  : `bundle.${ext}`;

const jsLoader = () => {
  const loaders = [
    {
      loader: "babel-loader",
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  ];

  if (!isProd) {
    loaders.push("eslint-loader");
  }

  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: ["@babel/polyfill", "./index.js"],
  output: {
    filename: fileName("js"),
    path: path.resolve(__dirname, dist),
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "src": path.resolve(__dirname, "src"),
      "core": path.resolve(__dirname, "src", "core"),
    },
  },
  devtool: !isProd ? "source-map" : false,
  devServer: {
    host: "localhost",
    port: 4000,
    progress: true,
    open: true,
    hot: !isProd,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html",
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "favicon.ico"),
          to: path.resolve(__dirname, dist),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: fileName("css"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoader(),
      },
    ],
  },
};
