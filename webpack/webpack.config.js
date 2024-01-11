const webpack = require('webpack');
const path = require('path');

function generateConfig(name) {
  var config = {
    entry: './lib/index.js',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: name + '.js',
      sourceMapFilename: name + '.map',
      library: 'binanceapi',
      libraryTarget: 'umd'
    },
    devtool: "source-map",
    mode: 'production',

    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
      alias: {
        [path.resolve(__dirname, "../lib/util/node-support.js")]:
          path.resolve(__dirname, "../lib/util/browser-support.js"),
      }
    },

    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        { test: /\.tsx?$/, loader: "ts-loader" },

        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { test: /\.js$/, loader: "source-map-loader" },

        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components|samples|lib|test|coverage)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', {
                'targets': {
                  'node': 'current'
                }
              }]]
            }
          }
        }
      ]
    }
  };

  config.plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    // new BundleAnalyzerPlugin({
    //   defaultSizes: 'stat',
    //   analyzerMode: 'static',
    //   reportFilename: '../doc/bundleReport.html',
    //   openAnalyzer: false,
    // })
  ];

  return config;
}

module.exports = generateConfig('binanceapi');
