/* craco.config.js */
const path = require('path');

/** React TS by default does not support paths, this adds webpack support for them.
 * These paths need to match those in the tsconfig file and vice versa. TS does not see this file and will throw errors otherwise
 */
module.exports = {
  webpack: {
    alias: {
      $components: path.resolve(__dirname, './src/components'),
      $shared: path.resolve(__dirname, './src/shared'),
    },
  },
};
