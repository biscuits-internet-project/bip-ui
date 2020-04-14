module.exports = {
    extends: [
      require.resolve('eslint-config-react-app-tsc'),
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
  
      // Disables rules that TypeScript already checks.
      'plugin:@typescript-eslint/eslint-recommended',
  
      // disables rules that prettier fixes.
      'prettier',
      // disable rules that common eslint configs set.
      'prettier/react',
      'prettier/@typescript-eslint',
    ],
    rules: {
    },
  }