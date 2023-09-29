module.exports = {
  baseDeclarations: function () {
    const baseVertex = `

    /* eslint-disable @typescript-eslint/no-empty-interface */
    
    //MODEL DEFINITION

      //     interface AspirantKeyProps extends BaseKeyProps {
      //   AspirantName: string;
      //   AspirantNo: string;
      //   ElectoralPost: string;
      // }

      // interface modelIndex {
      //   fields: string[];
      //   unique?: boolean;
      // }

      // interface attributeObjectProperty {
      //   // eslint-disable-next-line no-use-before-define
      //   [key: string]: keyProperty;
      // }

      // interface keyProperty {
      //   type: string;
      //   properties?: attributeObjectProperty;
      //   required?: boolean | string[];
      //   minimum?: number;
      //   maximum?: number;
      //   minLength?: number;
      //   maxLength?: number;
      //   pattern?: string;
      //   enum?: any[];
      //   [key: string]: any;
      // }

      // interface additionalProperty {
      //   type: string;
      //   properties?: attributeObjectProperty;
      //   required?: boolean | string[];
      //   additionalProperties?: additionalProperty;
      //   minimum?: number;
      //   maximum?: number;
      //   minLength?: number;
      //   maxLength?: number;
      //   pattern?: string;
      //   enum?: any[];
      //   [key: string]: any;
      // }

      // interface attributeProperty {
      //   [key: string]: keyProperty;
      // }

      // interface attributeRules {
      //   linkCollections?: string[];
      //   validateLinks?: boolean;
      //   properties?: attributeProperty;
      //   required?: boolean | string[];
      //   additionalProperties?: additionalProperty;
      // }

      // interface modelAttribute {
      //   type: string;
      //   required?: boolean;
      //   unique?: boolean;
      //   isIn?: any[];
      //   rules?: attributeRules;
      //   defaultsTo?: any;
      //   key?: any;
      // }

      // interface modelAttributes {
      //   [key: string]: modelAttribute;
      // }

      // interface ModelDefinition {
      //   tenantType?: string[];
      //   keyProps?: string[];
      //   cache?: boolean;
      //   indexes?: modelIndex[];
      //   // eslint-disable-next-line no-use-before-define
      //   attributes: modelAttributes;
      //   customToJSON?: () => void;
      //   beforeCreate?: (recordToCreate: any, proceed: () => void) => void;
      //   afterCreate?: (newlyCreatedRecord: any, proceed: () => void) => void;
      //   beforeUpdate?: (valuesToSet: any, proceed: () => void) => void;
      //   afterUpdate?: (updatedRecord: any, proceed: () => void) => void;
      //   beforeDestroy?: (criteria: any, proceed: () => void) => void;
      //   afterDestroy?: (destroyedRecord: any, proceed: () => void) => void;
      // }

    // END MODEL DEFINITION


      declare function ulid (seedTime?: number): string;
      type Database = import('arangojs/database').Database;

      declare interface BaseVertex {
        id: string;
        _id: string;
        _ref: string;
        _key: string;
        createdAt: number,
        updatedAt: number,
      }

      declare interface BaseEdge extends BaseVertex{
        _from: string;
        _to: string;
      }

      type refKeys = '_ref' | '_id';

      declare interface BaseKeyProps {
        id: string;
        _ref: string;
        [key: string]: any;
      }

      declare interface FindWithCountResults {
        documents: Array<this>;
        count: number;
      }

      declare interface TransactionParams {
        action(params?:any): any;
        writes: Array<string>;
        params: any;
      }
      

      interface dbCollections extends ArangoDB.Database {
        [key: string]: ArangoDB.Collection;
      }

      interface dbVertextCollection extends BaseVertex {
        [key: string]: any;
      }

      interface dbEdgeCollection extends BaseEdge {
        [key: string]: any;
      }

      // An instance of an Object. Eg UserObject.

      interface ObjectUpdateOtions {
        keepNull?: boolean;
        mergeObjects?: boolean;
        trx?: any;
      }

      type PartialInstance<T> = {
        [K in keyof T]?: T[K];
      }

      type ObjectKey = ${'`${string}.${string}`;'}
      type QueryVariable = ${'`$${string}`;'}

     
      interface ModelFindCriteria {
        $gt?: any;
        $gte?: any;
        $lt?: any;
        $lte?: any;
        $ne?: any;
        $like?: string;
        $notlike?: string;
        $contains?: string;
        $notcontains?: string;
        $in?: number[] | string[];
        in?: number[] | string[];
        $allin?: number[] | string[];
        $anyin?: number[] | string[];
        $has?: string;
        $nothas?: string;
        $nin?: number[] | string[];
      }

      interface ModelUpdateCriteria {
        $inc?: number;
        $pop?: boolean;
        $shift?: boolean;
        $unshift?: any;
        $unshiftset?: any;
        $push?: any;
        $pushset?: any;
        $pull?: any[];
      }

      type ModelFindParams<T> = {   
        [K in keyof T]?: T[K] | ModelFindCriteria;
      };

      interface OtherModelFindParams<T> {
        $or?: Array<ModelFindParams<T> | {
          [key: ObjectKey]: any;
        } | {
          [key: QueryVariable]: any;
        }>;
        $and?:  Array<ModelFindParams<T> | {
          [key: ObjectKey]: any;
        } | {
          [key: QueryVariable]: any;
        }>;
        [key: ObjectKey]: any;
        [key: QueryVariable]: any;
      }


      type ModelUpdateParams<T> = {
        [K in keyof T]?: T[K] | ModelUpdateCriteria;
      };

      

      interface FindObjectParams<T> {
        where: ModelFindParams<T> | OtherModelFindParams<T>;
        skip?: number;
        limit?: number;
        sort?: string | Array<string>;
        select?: string[] | string;  
      }

      declare interface BaseObjectInstance extends BaseVertex {
        update(
          params: ModelUpdateParams<this>,
          trx?: import('arangojs/transaction').Transaction,
          options?: ObjectUpdateOtions,
        ): Promise<void>;
        destroy(params: any, options: ObjectUpdateOtions): Promise<void>;
        saveToCache: () => void;
        getDocument: (params: PartialInstance<any>) => Promise<any>;
        getDocumentAsync: (params: PartialInstance<any>) => Promise<any>;
        nextId: (name: string) => Promise<string>;
        onDelete: () => Promise<void>;
        onCreate: () => Promise<void>;
        onUpdate: () => Promise<void>;
        onGetOne: () => Promise<void>;
        onCreateOrUpdate: () => Promise<void>;
        afterInitialize: () => void;
        reInitialize(params: PartialInstance<this>): void;
        pkColumnName: string;
        schema: any;
        merchantcode: string;
        getMerchantCode: ()=>string;
        tenantcode: string;
        cache: boolean;
        globalId: string;
        tableName: string;
        classType: string;
        _Transaction(params: TransactionParams): Promise<any>;
        _dbConnection: Database;
      }
  
      declare interface BaseEdgeObjectInstance extends BaseObjectInstance, BaseEdge {
        [key: string]: any;
      }


      //DBO BASE DECLARATIONS

      interface UpdateOptions {
        keepNull?: boolean;
        mergeObjects?: boolean;
      }

      declare interface BaseDboInstance extends BaseVertex {
        update(params: PartialInstance<this>, options?: UpdateOptions): void;
        onGetOne: () => void;
        afterInitialize: () => void;
        reInitialize(params: PartialInstance<this>): void; 
        globalId: string;
        instanceName: string;
        keyProps: BaseKeyProps;
      }
  
      // These are the methods of an Object constructor eg. UserDbo.findOne({id})
      declare interface BaseDbo <modelProps, instance> {
        getSchema: () => any;
        create(params: PartialInstance<modelProps>): instance;
        create(from: any, to: any, params: PartialInstance<modelProps>): instance;
        getDocument(params: {
          [key: refKeys]: string;
        }, options?: {fireOnGetOne: boolean;}): instance;
        findDocument(params: {
          [key: refKeys]: string;
        }): instance;
        findOne(params: string | ModelFindParams<modelProps> | OtherModelFindParams<modelProps>): instance | null;
        firstExample(params: PartialInstance<modelProps>): instance;
        find(params: string | ModelFindParams<modelProps> | OtherModelFindParams<modelProps>, options?: {
          limit?: number;
          skip?: number;
          sort?: string | string[];
          let?: any;
        }): ArangoDB.Cursor;
        initialize(params: PartialInstance<modelProps>): instance;
        extractKeyProps(params: PartialInstance<modelProps>): instance.keyProps;
    }  

      //End DBO BASE DECLARATIONS

      interface WaterlinePromise<T> extends Promise<T>{
        exec(cb: (err: Error, result: T) => void);
      }

      interface QueryBuilder<T> extends WaterlinePromise<T> {
        where(condition: any): QueryBuilder<T>;
        limit(lim: number): QueryBuilder<T>;
        skip(num: number): QueryBuilder<T>;
        sort(criteria: string): QueryBuilder<T>;
        meta(params: {
          fetch?: boolean;
          trx?: any;
          [key: string]: any;
        }): QueryBuilder<T>;
        select(params: string[]): QueryBuilder<T>;
        paginate(pagination?: { page: number; limit: number }): QueryBuilder<T>;
        populate(association: string): QueryBuilder<T>;
        populate(association: string, filter: any): QueryBuilder<T>;
        fetch(): QueryBuilder<T>;
    }

    // These are the methods of an Object constructor eg. UserObject.findOne({id})
      declare interface BaseObject <modelProps, instance> {
        /**
         * @params { dsName, Transaction, dbConnection }
         * @returns Promise<()=>void>
         * return Object.onDbConnectCb()
         * @description This method is fired when the object is initialized and datastore is connected
         * 
         **/
        onDbConnect(dbConnection: Sails.ManagerInstance, onDbConnectCb: ()=>void): Promise<()=void>;
        /**
         * @params asyncFunctionToExecute, interval
         * @returns Promise<void>
         * @description This method is fired when the object is initialized and datastore is connected
         * use this function to run a function at a given interval
         * 
         **/
        createInterval:(dbConnection: Sails.ManagerInstance)=>Promise<void>;
        interval: number;

        create(params: PartialInstance<modelProps>, merchantcode?:string): Promise<instance>;
        getDocument(params: PartialInstance<modelProps>, merchantcode?:string): Promise<instance>;
        getOne(params: PartialInstance<modelProps>, merchantcode?:string): Promise<instance>;
        findOne(params: PartialInstance<modelProps>, merchantcode?:string): Promise<instance | null>;
        findOneOrCreate(params: PartialInstance<modelProps>, merchantcode?:string): Promise<instance>;
        findDocument(params: PartialInstance<modelProps>, merchantcode?:string): Promise<instance>;
        searchFields: string[];
        modelDefaults: any;
        modelAttributes: {
          type: string;
          required: boolean;
          defaultsTo: any;
          allowNull: boolean;
          unique: boolean;
          rules: any;
        },
        modelOverrides: {
          tenantType?: string[],
          keyProps: string[],
          indexes: any[],
          attributes: any,
          [key: string]: any
        }


        /**
         * initialize a new instance of the model object with the given properties and methods
         */
        initialize(params: modelProps, merchantcode?:string, initOne?:boolean): instance;

    }      

    // these are the mothods that are used by sails models. eg. User.create(params)

      declare interface BaseModelMethods <modelProps,instance> {
        create(params: Partial<modelProps>): QueryBuilder<instance>;
        createEdge(
          params: PartialInstance<modelProps>,
          vertices: any,
        ): QueryBuilder<instance>;
        createEach(params: PartialInstance<modelProps>[]): QueryBuilder<instance[]>;
        findOne(
          params: string | ModelFindParams<modelProps> | OtherModelFindParams<modelProps>,
        ): QueryBuilder<instance | null>;
        findDocument(params: ModelFindParams<modelProps> | OtherModelFindParams<modelProps>): QueryBuilder<instance | null>;
        updateOne(params: string | ModelFindParams<modelProps> | OtherModelFindParams<modelProps>): {
          set(params: {
            [K in keyof modelProps]?: modelProps[K] | ModelUpdateCriteria;
          }): QueryBuilder<instance>;
        };
        updateOne(
          criteria: string | ModelFindParams<modelProps> |  OtherModelFindParams,
          params: ModelUpdateParams<modelProps>,
        ): {
          set(params: {
            [K in keyof modelProps]?: modelProps[K] | ModelUpdateCriteria;
          }): QueryBuilder<instance>;
        };
        find(params: ModelFindParams<modelProps> | FindObjectParams<modelProps> |  OtherModelFindParams<modelProps>): QueryBuilder<instance[]>;
        destroy(params: ModelFindParams<modelProps> | FindObjectParams<modelProps> |  OtherModelFindParams<modelProps>): QueryBuilder<instance[]>;
        sample(params?: any): QueryBuilder<instance[]>;
        findNear(params: any): QueryBuilder<instance[]>;
        count(params: ModelFindParams<modelProps> | OtherModelFindParams<modelProps>): WaterlinePromise<number>;
        avg(
          attribute: string,
          params: ModelFindParams<modelProps> | OtherModelFindParams<modelProps>,
        ): WaterlinePromise<number>;
        sum(
          atrribute: string,
          params: ModelFindParams<modelProps> | OtherModelFindParams<modelProps>,
        ): WaterlinePromise<number>;
        let(params: any): BaseModelMethods<modelProps, instance>;
        findWithCount(
          params: ModelFindParams<modelProps> | FindObjectParams<modelProps>,
        ): QueryBuilder<FindWithCountResults>;
        update( params: ModelFindParams<modelProps> | OtherModelFindParams<modelProps>): {
          set(params: {
            [K in keyof modelProps]?: modelProps[K] | ModelUpdateCriteria;
          }): QueryBuilder<instance[]>;
        };
        upsert( params: ModelFindParams<modelProps> | OtherModelFindParams<modelProps>): {
          set(params: {
            [K in keyof modelProps]?: modelProps[K] | ModelUpdateCriteria;
          }): QueryBuilder<instance[]>;
        };
        normalize: (params: PartialInstance<modelProps>) => WaterlinePromise<instance>;

        /**
         * perform aggregations on the model
         * @param params
         * 
         * @example
         * const summary = await _Receivedproduct(merchantcode).aggregate({
         *  $filter: {
         *    Timestamp: { $gt: dayjs().startOf('year').valueOf() },
         *  },
         * $let: {
         *  length: {$length: '$group}
         * },
         *  $collect: {
         *    ProductCode: 'Produce.ProductCode',
         *    year: { $date_year: 'Timestamp' },
         *    week: { $date_isoweek: 'Timestamp' },
         *  },
         * $withcountinto: 'length',
         * intogroup: 'name',
         *  $aggregate: {
         *    Weight: { $sum: 'Produce.Weight' },
         *  },
         * 
         *  $filter2: {
         *    $Weight: { $gt: 0 },
         *  },
         * 
         *  $sort: {
         *    week: 'ASC',
         *  },
         * 
         *  $return: {
         *    Year: '$year',
         *    Week: '$week',
         *    WeekYear: { $concat: ['$week', '"-"', '$year'] },
         *    ProductCode: '$ProductCode',
         *    Weight: '$Weight',
         *  },
         * });
         * 
         **/
        aggregate: (params: {
          $let?:{
            [key: string]: any
          };
          $filter?: {
            [key: string]: any;
          };
          $collect: {
            [key: string]: string;
          };
          $intogroup?: string;
          $withcountinto?: string;
          $aggregate: {
            [key: string]: {
              $sum?: string;
              [key: string]: string;
            };
          };
          $filter2?: {
            [key: string]: any;
          };
          $sort?: {
            [key: string]: any;
          };
          $return: {
            [key: string]: string;
          };
          [key: string]: any;
        }) => WaterlinePromise<any>;
      }

      /**
       * @description - get a document by its reference keys. Dont use this method inside a transaction
       * @param params {_id: string, _ref: string} - the reference keys of the document
       * @param merchantcode - the merchantcode of the document
       * @returns DbObjectInstance
       **/
      function getDocumentAsync<instance>(params: {
        [key: refKeys]: string;
      }, merchantcode?:string): WaterlinePromise<instance>;

      /**
       * @description - get a document by its reference keys. Use this method inside a transaction. Dont use it within a onGetOne hook
       * @param params {_id: string, _ref: string}
       * @param options - {fireOnGetOne: true} - if true, will fire the onGetOne hook
       * @param options.fireOnGetOne - if true, will fire the onGetOne hook
       * @returns DboInstance
       **/
      function getDocument<instance>(params: {
        [key: refKeys]: string;
      }, options?: {fireOnGetOne: boolean;} ): instance;

      /**
       * @description - find a document by its reference keys. Use this method inside a transaction. You can use it within a onGetOne hook
       * @description - this method will not fire the onGetOne hook
       * @param params {_id: string, _ref: string}
       * @returns DboInstance
       **/
      function findDocument<instance>(params: {
        [key: refKeys]: string;
      }): instance;


  
      interface ISystemSettings {
        //
      }
      declare const SystemSettings: ISystemSettings;

      interface GraphqlModelMethodParams {
        inputObject: (params?: {
          [key: string]: {
            type: 'string' | 'number' | 'boolean' | 'array' | 'object';
          };
        }) => any;
        resultObject: (params?: {
          [key: string]: {
            type: string;
          };
        }) => any;
      }

      `;

    return baseVertex;
  },

  graphqlTypes: function (models) {
    function renderCollections() {
      let collections = ``;
      for (const key in models) {
        const model = models[key];

        collections = `${collections}

        interface ${model.globalId}GraphqlModelParams {
          
          ModelProperties: IModels;
          ${model.globalId}Model: any;
          ModelType: any;
          ModelTypes: IModelTypes;
          Models: IModels;
          CustomTypes: {
            ObjectType: any;
            AnyValueType: any;
            AnyDocumentType: any;
          },
          Obj: any;
          FindResults: {
            totalCount: number;
            items: any[];
          }
        }`;
      }
      return collections;
    }

    let graphqlCollections = `
        interface IModelTypes {
          ${Object.keys(models).reduce(
            (acc, key) => `${acc}
            ${models[key].globalId}Model: any;`,
            ''
          )}
        }

        interface IModels {
          ${Object.keys(models).reduce(
            (acc, key) => `${acc}
            ${models[key].globalId}: any;`,
            ''
          )}
        }
         
        ${renderCollections()}
      
    `;

    return graphqlCollections;
  },

  dbCollections: function (models) {
    function renderCollections() {
      let collections = ``;
      for (const key in models) {
        const model = models[key];
        const collectionName = `${model.globalId}`.toLowerCase();
        collections = `${collections}
        ${collectionName}: ArangoDB.Collection;`;
      }
      return collections;
    }

    let dbCollections = `
      declare interface db extends dbCollections {
          ${renderCollections()}
      }
      
      declare const db: db;
      
      `;

    return dbCollections;
  },

  modelTypes: function (globalId) {
    const iModel = `

      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      // Declare model types for ${globalId}
      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

      //MODELOBJECTS


      interface ${globalId}Props extends BaseVertex {
        // [key: string]: any;
      }
      
      interface ${globalId}KeyProps extends BaseKeyProps {
      }

     
      //We can override the below.
      // DBOBJECTS
      interface Base${globalId}ObjectInstance extends BaseObjectInstance, ${globalId}Props {
        getKeyProps(): ${globalId}KeyProps;
        keyProps: ${globalId}KeyProps;
      }

      interface Base${globalId}DboInstance extends BaseDboInstance, ${globalId}Props {
        getKeyProps(): ${globalId}KeyProps;
        keyProps: ${globalId}KeyProps;
      }
      
      type Extend${globalId}ObjectInstanceType = typeof Extend${globalId}ObjectInstance;
      type Extend${globalId}DboInstanceType = typeof Extend${globalId}DboInstance;

      interface ${globalId}ObjectInstance extends BaseObjectInstance, ${globalId}Props,  Extend${globalId}ObjectInstanceType{
        getKeyProps(): ${globalId}KeyProps;
        keyProps: ${globalId}KeyProps;
      }

      // THESE ARE FOR WATERLINE MODELS
      declare let ${globalId}: BaseModelMethods<${globalId}Props, ${globalId}ObjectInstance>;
      declare function _${globalId}(merchantcode: string): BaseModelMethods<${globalId}Props, ${globalId}ObjectInstance>;

      type Extend${globalId}ObjectType = typeof Extend${globalId}Object;
      type Extend${globalId}DboType = typeof Extend${globalId}Dbo;


      interface ${globalId}Object extends BaseObject<${globalId}Props, ${globalId}ObjectInstance>, Extend${globalId}ObjectType {
        globalId: '${globalId}';
        tableName: '${`${globalId}`.toLowerCase()}';
        classType: 'Vertex';
        __proto: Base${globalId}ObjectInstance;
        prototype: ${globalId}ObjectInstance;
      }

      //We can override the below.
      // DBO

      type ${globalId}QueryParams = ModelFindParams<${globalId}ObjectInstance> | OtherModelFindParams<${globalId}ObjectInstance>;
     
     interface ${globalId}DboInstance extends BaseDboInstance, ${globalId}Props,  Extend${globalId}DboInstanceType {
        // [key: string]: any;
        update(params: PartialInstance<${globalId}Props>, options?: UpdateOptions): void;
        reInitialize(params: PartialInstance<${globalId}Props>): void; 
        globalId: '${globalId}';
        tableName: '${`${globalId}`.toLowerCase()}';
        keyProps: ${globalId}KeyProps;
        getKeyProps(): ${globalId}KeyProps;
      }

      interface ${globalId}Dbo extends BaseDbo<${globalId}Props, ${globalId}DboInstance>, Extend${globalId}DboType  {
        globalId: '${globalId}';
        tableName: '${`${globalId}`.toLowerCase()}';
        classType: 'Vertex';
        __proto: Base${globalId}DboInstance;
        prototype: ${globalId}DboInstance;
        modelDefaults: any;
      }

      let ${globalId}Object: ${globalId}Object;
      let ${globalId}Dbo: ${globalId}Dbo;

     
      // End Declarations for ${globalId}

   
      
      
      `;

    return iModel;
  },
};
