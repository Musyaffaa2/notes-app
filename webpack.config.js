const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Membersihkan folder dist saat build
  },
  mode: "development",
  devServer: {
    static: "./dist",
    port: 8080,
    open: true, // Otomatis buka browser
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Untuk file JS
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/, // Untuk file CSS
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // HTML template dari folder src
    }),
  ],
};
