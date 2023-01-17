const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (arg, { mode }) => {
  return {
    mode: mode || "development",
    entry: "./src/main.js",
    devtool: mode === "production" ? false : "cheap-module-source-map",
    output: {
      filename: "js/[name].[fullhash].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      assetModuleFilename: 'assets/[hash][ext][query]'
    },
    plugins: [
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
        {
          test: /\.html$/,
          loader: "html-loader"
        }
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
