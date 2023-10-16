import * as path from "path";
import type { Configuration } from "webpack";

const config: Array<Configuration> = [
  // The module including dependencies
  {
    entry: './src/index.ts',
    output: {
        globalObject: 'window',
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.ts|js$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
  }
];

export default config;