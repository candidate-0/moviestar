const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/client/App.js",
  output: {
    filename: "app.js",
    path: path.join(__dirname, "public"),
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    proxy: {
      "/graphql": "http://localhost:4000",
    },
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "src/client/template.html" })],
};
