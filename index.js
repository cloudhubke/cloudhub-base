const rootDir = process.cwd();
const fs = require("fs");
const includeFiles = require("include-files");
const types = require("./types");
const { getState } = require("./store");

const globals = {};

let oldStr = "";

let modelTypes = "";

let dbCollections = "";

let graphqlTypes = "";

function ensureFolderExists(path, mask, cb) {
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
        "exclude": ["node_modules", "build", ".build", "**/*.json"],
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

ensureFolderExists(`${rootDir}/api/modelsoverride`, () => {
  ensureFolderExists(`${rootDir}/api/modelsoverride/admin`, () => null);
  ensureFolderExists(`${rootDir}/api/modelsoverride/merchantadmin`, () => null);
});

ensureFolderExists(`${rootDir}/api/dbobjectsoverride`, () => {
  ensureFolderExists(`${rootDir}/api/dbobjectsoverride/admin`, () => null);
  ensureFolderExists(
    `${rootDir}/api/dbobjectsoverride/merchantadmin`,
    () => null
  );
});

ensureFolderExists(`${rootDir}/types`, () => null);

ensureTsConfigExists();
ensureSailsDts();

includeFiles.getDictionary(
  {
    dirname: `${rootDir}/api/models/merchantadmin`,
    filter: /(.*).(ts|js)(?<!\.d\.ts)$/,
    replaceExpr: /^.*\//,
  },
  (err, models) => {
    const folders = Object.keys(models);
    for (const folder of folders) {
      ensureFolderExists(
        `${rootDir}/api/modelsoverride/merchantadmin/${folder}`,
        () => {
          const collections = Object.keys(models[folder]).filter(
            (t) => !["identity", "globalId"].includes(t)
          );

          for (const collection of collections) {
            try {
              if (
                fs.existsSync(
                  `${rootDir}/api/modelsoverride/merchantadmin/${folder}/${collection}.ts`
                )
              ) {
                //file exists
              } else {
                fs.writeFile(
                  `${rootDir}/api/modelsoverride/merchantadmin/${folder}/${collection}.ts`,
                  `module.exports = {
                    tenantType:[],
                    attributes: {},              
                };
              `,
                  function (err) {
                    // do nothing
                  }
                );
              }
            } catch (err) {
              // nothing to do
            }
          }
        }
      );
    }
  }
);

function createGraphqlOverride({ url, file, definition }) {
  const isFile =
    Object.keys(definition).length === 2 &&
    Object.keys(definition).includes("identity") &&
    Object.keys(definition).includes("globalId");

  if (isFile) {
    try {
      if (fs.existsSync(`${url}.ts`)) {
        //file exists
      } else {
        fs.writeFile(
          `${url}.ts`,
          `import { GraphQLNonNull, GraphQLList, GraphQLBoolean } from 'graphql';

module.exports = {
  /**
   * @param {ModelType, ModelProperties, ModelTypes, Models, CustomTypes}
   * @description This function is used to extend the the graphql root methods of find, getOne, etc
   * @returns Object
   */
  rootMethods: function ({${file}Model, CustomTypes: { ObjectType }}: ${file}GraqlqlModelParams) {
    return {
      save:  ({inputObject}: GraphqlModelMethodParams)=>({
        type: ${file}Model,
        description: 'Create a document in the ${file} collection',
        args: {
          params: { type: inputObject({}) },
        },
        resolve: async (parent: any, { params }: any, { req }: {req: SailsRequest}) => {
          // const { merchantcode, ...headers } = req.headers;
          // let doc:${file}ObjectInstance | null;
          // let Model = ${file};
          // if(merchantcode){
          //   Model = _${file}(merchantcode);
          // }
          // if(params.id){
          //   doc = await Model.findOne({ id: params.id });
          //   if(doc){
          //     await doc.update(params);
          //   }
          // }else{
          //   if (!params.RefNo) {
          //     params.RefNo = await 
          //     CounterObject.nextId('${file
            .substring(0, 2)
            .toUpperCase()}', merchantcode);
          //   }
          //   doc = await Model.create(params).fetch();
          // }
          // return doc;
        },
      }),
      destroy: ({inputObject}: GraphqlModelMethodParams)=>({
        type: new GraphQLList(${file}Model),
        description: 'Destroy documents in the ${file} collection',
        args: {
          params: { type: inputObject({}) },
        },
        resolve: async (parent: any, { params }: any, { req }: {req: SailsRequest}) => {
          // const { merchantcode, ...headers } = req.headers;
          // let Model = ${file};
          // if(merchantcode){
          //   Model = _${file}(merchantcode);
          // }
          // const docs = await Model.destroy({
          //   ...params,
          // }).fetch();
          // return docs;
        },
      })
    };
  },
  /**
   * @param {SchemaTypes, ModelTypes, CustomTypes}
   * @description This function is used to extend the the graphql schema properties methods
   * @returns Object
   */
  properties: function ({${file}Model, CustomTypes: { ObjectType } }: ${file}GraqlqlModelParams) {
    return {
      update:  ({inputObject}: GraphqlModelMethodParams)=>({
        type: ${file}Model,
        description: 'Update the ${file}',
        args: {
          params: {
            type: inputObject({}),
          },
        },
        resolve: async (${`${file}`.toLowerCase()}: ${file}ObjectInstance, { params }: any) => {
          console.log('update ${file}', ${`${file}`.toLowerCase()}.globalId, typeof params);
          return true;
        },
      }),
    };
  },
};
`,
          function (err) {
            // do nothing
          }
        );
      }
    } catch (err) {
      // nothing to do
    }
  } else {
    ensureFolderExists(`${url}`, () => {
      //
    });

    const files = Object.keys(definition).filter(
      (t) => !["identity", "globalId"].includes(t)
    );

    for (const file of files) {
      createGraphqlOverride({
        url: `${url}/${file}`,
        file,
        definition: definition[file],
      });
    }
  }
}

includeFiles.getDictionary(
  {
    dirname: `${rootDir}/api/models`,
    filter: /(.*).(ts|js)(?<!\.d\.ts)$/,
    // replaceExpr: /^.*\//,
  },
  (err, models) => {
    ensureFolderExists(`${rootDir}/api/graphql`, () => {
      //
    });

    const files = Object.keys(models).filter(
      (t) => !["identity", "globalId"].includes(t)
    );
    for (const file of files) {
      const definition = models[file];
      createGraphqlOverride({
        url: `${rootDir}/api/graphql/${file}`,
        file,
        definition,
      });
    }
  }
);

includeFiles.getDictionary(
  {
    dirname: `${rootDir}/api/models`,
    filter: /(.*).(ts|js)(?<!\.d\.ts)$/,
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
    graphqlTypes = `${types.graphqlTypes(models)}`;
  }
);

let typeStr = `${types.baseDeclarations()} ${modelTypes} ${dbCollections}  ${graphqlTypes}`;

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
    filter: /(.*).(ts|js)(?<!\.d\.ts)$/,
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
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
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
    "import/no-cycle": 0,
    quotes: "off",
    "no-use-before-define": ["error", { functions: false, classes: true }],
    "no-global-assign": "error",
    "no-restricted-syntax": "off",
    "import/no-extraneous-dependencies": "off",
    "no-const-assign": "error",
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
