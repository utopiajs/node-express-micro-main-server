module.exports = {
  extends: ['@utopia/eslint-config-base'],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'func-names': 0,
    'no-console': ['error', { allow: ['warn', 'error'] }]
  }
};
