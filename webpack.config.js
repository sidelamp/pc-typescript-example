const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, "build/scripts"),
  },
  externals: {
    playcanvas: 'pc'
  }
};
