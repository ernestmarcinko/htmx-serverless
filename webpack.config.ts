import * as path from "path";
import type { Configuration } from "webpack";

const config: Array<Configuration> = [
// The module including dependencies
{
  entry: './src/index.ts',
  output: {
      library: {
          name: 'htmxServerless',
          type: 'umd',
          export: 'default',
          umdNamedDefine: true
      },
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
},

// The global to use from browser
{
  entry: './src/index.ts',
  externals: {
    'htmx.org': 'htmx'
  },
  output: {
      library: {
          name: 'htmxServerless',
          type: 'umd',
          export: 'default',
          umdNamedDefine: true
      },
      globalObject: 'window',
      path: path.resolve(__dirname, 'dist'),
      filename: 'htmx-serverless.js',
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