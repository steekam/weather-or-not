const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const lightningcss = require('lightningcss');
const browserslist = require('browserslist');
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
  },
  jest: {
    configure: {
      moduleNameMapper: { '^axios$': 'axios/dist/node/axios.cjs' },
    },
  },
}