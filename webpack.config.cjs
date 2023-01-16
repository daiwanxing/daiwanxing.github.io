const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (arg, { mode }) => {
  return {
    mode: mode || "development",
    entry: "./src/main.js",
    output: {
      filename: "[name].[fullhash].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.sc|ass$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /.*(\.jpe?g|png|svg)$/,
          type: "asset/resource",
        },
      ],
    },
    devServer: {
      port: 9090,
      compress: true,
      hot: true,
      open: true,
      static: {
        directory: path.join(__dirname, "public"),
      },
      client: {
        progress: true,
      },
    },
  };
};
