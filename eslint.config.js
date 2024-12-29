import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      globals: {
        ...globals.node, // Enables Node.js global variables and scope
        ...globals.browser // Enables browser global variables
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    ignores: [
      '**/test/**',
      '**/request/**',
      '**/response/**',
      '**/**.repository.ts',
      '**/errorHandler/**'
    ] // Ignore all files inside any `test` folder
  },
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json'
        }
      }
    },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      'prefer-const': 'error',
      'prefer-destructuring': 'off',
      semi: ['error', 'always'],
      indent: ['error', 2],
      '@typescript-eslint/space-before-function-paren': 'off',
      '@typescript-eslint/consistent-type-definitions': 'error',
      'no-console': 'warn',
      'no-restricted-imports': ['error', 'import1', 'import2']
    }
  }
];
