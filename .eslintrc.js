module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2017,
    project: './tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['ember', 'prettier', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint'
  ],
  env: {
    browser: true
  },
  rules: {},
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'commitlint.config.js',
        'ember-cli-build.js',
        'index.js',
        'prettier.config.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js'
      ],
      excludedFiles: [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      rules: Object.assign(
        {},
        require('eslint-plugin-node').configs.recommended.rules,
        {
          '@typescript-eslint/no-var-requires': 'off'
        }
      )
    }
  ]
};
