const rootDir = process.cwd();
const fs = require("fs");
const includeFiles = require("include-files");
const types = require("./types");
const { getState } = require("./store");

const globals = {};

let oldStr = "";

let modelTypes = "";

let dbCollections = "";

function ensureTypesFolderExists(path, mask, cb) {
  if (typeof mask == "function") {
    // Allow the `mask` parameter to be optional
    cb = mask;
    mask = 0o744;
  }
  fs.mkdir(path, mask, function (err) {
    if (err) {
      if (err.code == "EEXIST") cb(null);
      // Ignore the error if the folder already exists
      else cb(err); // Something else went wrong
    } else cb(null); // Successfully created folder
  });
}

function ensureSailsDts() {
  try {
    if (fs.existsSync(`${rootDir}/types/sails.d.ts`)) {
      //file exists
    } else {
      const { exec } = require("child_process");
      exec(
        `cp ${__dirname}/sails.d.ts ${rootDir}/types/sails.d.ts`,
        (err, stdout, stderr) => {
          if (err) {
            console.log(`Could not create sails.d.ts file`);
          }
        }
      );
    }
  } catch (err) {
    // nothing to do
  }
}

function ensureTsConfigExists() {
  try {
    if (fs.existsSync(`${rootDir}/tsconfig.json`)) {
      //file exists
    } else {
      fs.writeFile(
        `${rootDir}/tsconfig.json`,
        `{
        "compilerOptions": {
          "allowJs": true,
          "target": "ESNext",
          "module": "commonjs",
          "rootDir": "./",
          "outDir": "./.build",
          "baseUrl": "./",
          "esModuleInterop": true,
          "lib": ["DOM", "ESNext"],
          "resolveJsonModule": true,
          "skipLibCheck": true,
          "strict": true,
          "typeRoots": ["types", "node_modules/@types"],
          "paths": {
            "*": ["types/*.d.ts"]
          }
        },
        "include": ["**/*", "app.ts"],
        "exclude": ["node_modules", "build', ".build", "**/*.json"],
        "ts-node": {
          // It is faster to skip typechecking.
          // Remove if you want ts-node to do typechecking.
          "transpileOnly": false,
      
          "files": true,
      
          "compilerOptions": {
            // compilerOptions specified here will override those declared below,
            // but *only* in ts-node.  Useful if you want ts-node and tsc to use
            // different options with a single tsconfig.json.
          }
        }
      }
      `,
        function (err) {
          if (err) {
            return console.log(err);
          }
        }
      );
    }
  } catch (err) {
    // nothing to do
  }
}

ensureTypesFolderExists(`${rootDir}/types`, () => null);
ensureTsConfigExists();
ensureSailsDts();

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

      modelTypes = `${modelTypes}${types.modelTypes(model.globalId)}`;
    }

    dbCollections = `${types.dbCollections(models)}`;
  }
);

let typeStr = `${types.baseDeclarations()} ${modelTypes} ${dbCollections}`;

if (getState().modelTypes !== typeStr) {
  getState().setModelTypes(typeStr);
  try {
    fs.writeFile(`${rootDir}/types/models.d.ts`, `${typeStr}`, function (err) {
      if (err) {
        return console.log(err);
      }
    });
  } catch (error) {}
}

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
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parserOptions: {
    ecmaVersion: 8,
    project: ["tsconfig.json"],
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
    "guard-for-in": "off",
    radix: [0],
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "no-multi-assign": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-floating-promises": 2,
    "@typescript-eslint/no-var-requires": "off",
  },
};
