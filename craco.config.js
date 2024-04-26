const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const lightningcss = require('lightningcss');
const browserslist = require('browserslist');
const {TsconfigPathsPlugin} = require("tsconfig-paths-webpack-plugin");
const path = require("node:path");

/** @type {import('@craco/types').CracoConfig}  */
module.exports = {
  webpack: {
    alias: {
      "~": path.resolve(__dirname, 'src/'),
    },
    configure: {
      optimization: {
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin({
            minify: CssMinimizerPlugin.lightningCssMinify,
            minimizerOptions: {
              targets: lightningcss.browserslistToTargets(browserslist('>= 0.25%'))
            },
          }),
        ],
      },
    }
  }
}