// setting up ESlint for Typescript project
// https://typescript-eslint.io/docs/

module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'prettier',
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'plugin:prettier/recommended',
  ],
  plugins: [
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint',
    'eslint-plugin-tsdoc', // https://tsdoc.org/
    'react',
    'prettier',
  ],
  // parser settings for all files
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // project: './tsconfig.json',
    // tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  overrides: [
    {
      // adding separate parser settings for Typescript
      // check https://stackoverflow.com/a/64488474/3053548
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension

      // As mentioned in the comments, you should extend TypeScript plugins here,
      // instead of extending them outside the `overrides`.
      // If you don't want to extend any rules, you don't need an `extends` attribute.
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],

      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
    },
  ],
  rules: {
    'react/jsx-one-expression-per-line': ['off'],
    'max-len': [
      'warn',
      {
        code: 100,
        tabWidth: 2,
        ignoreComments: true,
        ignoreUrls: true,
      },
    ],
    'react/jsx-props-no-spreading': ['off'],
    'tsdoc/syntax': 'warn',
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'tsdoc/syntax': 'warn',
    'react/react-in-jsx-scope': 'off', // https://stackoverflow.com/a/61160875/3053548
    'jsx-quotes': ['error', 'prefer-single'],
    // 'object-curly-newline': ["error", { "multiline": true }
    'prettier/prettier': 'warn',
    'max-classes-per-file': 'off',
  },
};
