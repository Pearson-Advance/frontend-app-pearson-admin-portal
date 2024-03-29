const path = require('path');
const { createConfig } = require('@edx/frontend-build');

module.exports = createConfig('webpack-prod', {
  resolve: {
    alias: {
      features: path.resolve(__dirname, 'src/features'),
    },
  },
  // Hide runtime Errors for data-report view
  devServer: {
    client: {
      overlay: {
        runtimeErrors: false,
      },
    },
  },
});
