// eslint-disable-next-line import/no-extraneous-dependencies
const { createConfig } = require('@openedx/frontend-build');

module.exports = createConfig('eslint', {
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'react/no-unstable-nested-components': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
});
