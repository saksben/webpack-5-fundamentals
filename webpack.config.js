const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
  const HelloWorldPlugin = require("./hw-plugin/index")

let production = process.env.NODE_ENV === "production";

let config = {
  entry: ["./src/index", "./src/home"],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          "ts-loader", 
          // path.resolve("./gen-loader/index.js")
        ],
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024,
          },
        },
        generator: {
          filename: "images/[hash][name][ext]",
        },
      },
      {
        test: /\.txt$/,
        type: "asset/source",
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]],
              },
            },
          },
          "sass-loader",
        ], // order-dependent
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new MiniCssExtractPlugin({ filename: "bundle.css" }),
    new CopyPlugin({
      patterns: [{ from: "./src/images", to: "images" }],
    }),
    // new BundleAnalyzerPlugin(),
    new HelloWorldPlugin(),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
  devtool: "inline-source-map",
  mode: "development",
  devServer: {
    watchFiles: ["src/**/*", "index.html"],
    static: "./dist",
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Api proxy root
        pathRewrite: { "^/api": "" }
      }
    },
  },
};

if (production) {
  config.mode = "production";
  config.devtool = "inline-source-map";
}

module.exports = config;
