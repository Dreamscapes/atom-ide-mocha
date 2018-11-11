'use strict'

module.exports = {
  extends: [
    '@commitlint/config-conventional',
  ],

  rules: {
    'scope-enum': [2, 'always', [
      'reporter',
      'atom-panel',
    ]],

    'body-leading-blank': [2, 'always'],
  },
}
