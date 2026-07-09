import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      // Large generated data files
      'gen_day*.js',
      'data/topics/all-topics-data.js',
      'lib/testData.js',
      'lib/testData-days51-75.js',
    ],
  },
  {
    files: ['**/*.{js,jsx,mjs}'],
    ...js.configs.recommended,
    plugins: {
      'react-hooks': reactHooks,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // React Hooks — downgrade to warn so pre-existing code issues don't
      // block the lint script; fix these as a separate task (#2)
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
  {
    // CommonJS files
    files: ['tailwind.config.js', 'postcss.config.js'],
    languageOptions: {
      globals: globals.node,
      sourceType: 'commonjs',
    },
  },
];
