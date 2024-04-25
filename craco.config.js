const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const lightningcss = require('lightningcss');
const browserslist = require('browserslist');

/** @type {import('@craco/types').CracoConfig}  */
module.exports = {
  webpack: {
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