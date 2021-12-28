const rootDir = process.cwd();

const includeFiles = require('include-files');

const globals = {};

includeFiles.getDictionary(
  {
    dirname: `${rootDir}/api/models`,
    filter: /^(.+)\.(?:(?!md|txt).)+$/,
    replaceExpr: /^.*\//,
    flatten: true,
  },
  (err, models) => {
    for (const key in models) {
      const model = models[key];
      const ModelObjectName = `${model.globalId}Object`;
      const DbObjectName = `${model.globalId}Dbo`;
      globals[ModelObjectName] = true;
      globals[DbObjectName] = true;
      globals[`${model.globalId}`] = true;
      globals[`_${model.globalId}`] = true;
    }
  }
);

includeFiles.exists(
  {
    dirname: `${rootDir}/api/services`,
    filter: /^(.+)\.(?:(?!md|txt).)+$/,
    replaceExpr: /^.*\//,
    flatten: true,
  },
  (err, services) => {
    for (const key in services) {
      globals[`${key}`] = true;
    }
  }
);

module.exports = {
  parser: '@babel/eslint-parser',
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 8,
    requireConfigFile: false,
  },
  globals: {
    sails: true,
    db: true,
    _: true,
    async: true,
    moment: true,

    //DBOS
    refcounters: true,
    SystemSettings: true,
    databaseAdapters: true,
    normalize: true,
    getDocument: true,
    Promise: true,

    ...globals,
  },
  rules: {
    'no-underscore-dangle': 'off',
    'no-await-in-loop': 'off',
    quotes: 'off',
    'no-use-before-define': ['error', { functions: false, classes: true }],
    'no-global-assign': 'error',
    'no-restricted-syntax': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'no-console': 'off',
    'prefer-destructuring': 'off',
    'no-async-promise-executor': 'off',
    'no-param-reassign': 'off',
    'object-curly-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'spaced-comment': 'off',
    'wrap-iife': 'off',
    'operator-linebreak': 'off',
    'no-useless-catch': 'off',
    'no-shadow': 'off',
    'arrow-body-style': 'off',
    'object-shorthand': 'off',
    'max-len': 'off',
    'global-require': 'off',
    'no-extend-native': 'off',
    indent: 'off',
    'func-names': ['error', 'as-needed'],
    'guard-for-in': 'off',
    radix: [0],
  },
};
