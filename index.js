module.exports = {
  parser: "babel-eslint",
  extends: "airbnb-base",
  rules: {
    "no-underscore-dangle": "off",
    "no-await-in-loop": "off",
    quotes: "off",
    "no-use-before-define": ["error", { functions: false, classes: true }],
    "no-global-assign": "error",
    "no-restricted-syntax": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "no-console": "off",
    "prefer-destructuring": "off",
    "no-async-promise-executor": "off",
    "no-param-reassign": "off",
    "object-curly-newline": "off",
    "implicit-arrow-linebreak": "off",
    "spaced-comment": "off",
    "wrap-iife": "off",
    "operator-linebreak": "off",
    "no-useless-catch": "off",
    "no-shadow": "off",
    "arrow-body-style": "off",
    "object-shorthand": "off",
    "max-len": "off",
    "global-require": "off",
    "no-extend-native": "off",
    indent: "off",
    "func-names": ["error", "as-needed"],
  },
};