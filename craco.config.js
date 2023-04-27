/* craco.config.js */
const path = require('path');

/** React TS by default does not support paths, this adds webpack support for them */
module.exports = {
  webpack: {
    alias: {
      $components: path.resolve(__dirname, './src/components'),
      $shared: path.resolve(__dirname, './src/shared'),
    },
  },
};
