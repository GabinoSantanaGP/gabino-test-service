module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    globalThis: false, // means it is not writeable
  },
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        createDefaultProgram: true,
        // ecmaVersion: 2020,
        project: 'tsconfig.json',
        sourceType: 'module',
      },
    },
    {
      files: ['**/*.test.js'],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { vars: 'local' }],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/type-annotation-spacing': 'error',
    'arrow-parens': ['error', 'always'],
    'brace-style': ['error', '1tbs'],
    'comma-dangle': ['error', 'always-multiline'],
    'jsdoc/check-alignment': 'error',
    'jsdoc/check-indentation': 'error',
    'linebreak-style': 'off',
    'newline-per-chained-call': [
      'error',
      {
        ignoreChainWithDepth: 3,
      },
    ],
    'no-extra-semi': 'error',
    'no-irregular-whitespace': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxBOF: 1,
      },
    ],
    'no-null/no-null': 'off',
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always'],
    'no-var': 'error',
    'prefer-const': 'error',
    'quote-props': ['error', 'as-needed'],
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/'],
      },
    ],
    'no-extra-boolean-cast': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Package imports.
          ['^@?\\w'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        ],
      },
    ],
  },
  plugins: ['prettier', 'eslint-plugin-no-null', 'eslint-plugin-jsdoc', '@typescript-eslint', 'eslint-plugin-prettier', 'simple-import-sort'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],
  ignorePatterns: ['node_modules/*', '.eslintrc.js', 'dist', '/test', 'build'],
};
