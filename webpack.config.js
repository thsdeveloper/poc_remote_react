const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: 'production',
  entry: path.resolve("src/index.tsx"),
  output: {
    publicPath: "auto"
  },
  resolve: {
    alias: {
      src: path.resolve("src"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  devServer: {
    port: 8080,
    },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {test: /\.(png|jpg|gif|jpe?g|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: './img',
              emitFile: false
            }
          }
        ]}
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
      new ModuleFederationPlugin({
          name: "MfExample",
          filename: "remoteEntry.js",
          remotes: {},
          exposes: {
              "./MfExample": "./src/index",
          },
          shared: [
              {
                  react: {
                      eager: true,
                      singleton: true,
                      requiredVersion: false
                  }
              },
              {
                  "react-dom": {
                      eager: true,
                      singleton: true,
                      requiredVersion: false
                  },
              },
          ]
      }),
  ],
};