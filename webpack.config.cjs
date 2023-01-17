const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (arg, { mode }) => {
  return {
    target: ["es2020", "web"],
    mode: mode || "development",
    entry: {
      main: ["./src/main.js"],
    },
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
      new MiniCssExtractPlugin({
        filename: "[name].[fullhash].css"
      }),
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [ mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /.*(\.jpe?g|png|svg)$/,
          type: "asset/resource",
        },
        {
          test: /\.html$/,
          loader: "html-loader",
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
    resolve: {
      alias: {
        "@": path.join(__dirname, "src")
      }
    }
  };
};
