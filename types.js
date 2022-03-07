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

      type Database = import('arangojs/database').Database;

      declare interface BaseVertex {
        id: string;
        _id: string;
        _key: string;
        createdAt: number,
        updatedAt: number,
      }

      declare interface BaseEdge extends BaseVertex{
        _from: string;
        _to: string;
      }

      declare interface BaseKeyProps {
        id: string;
        _id: string;
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

      type ObjectKey = ${"`${string}.${string}`;"}

     
      interface ModelFindCriteria {
        $gt?: number;
        $gte?: number;
        $lt?: number;
        $lte?: number;
        $ne?: number;
        $like?: string;
        $notlike?: string;
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

      interface OtherModelFindParams {
        $or?: any[];
        $and?: any[];
        [key: ObjectKey]: any;
      }

      type ModelUpdateParams<T> = {
        [K in keyof T]?: T[K] | ModelUpdateCriteria;
      };
      

      interface FindObjectParams<T> {
        where: ModelFindParams<T>;
        skip?: number;
        limit?: number;
        sort?: string;
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
        nextId: (name: string) => Promise<number>;
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
        tenantcode: string;
        cache: boolean;
        globalId: string;
        classType: string;
        _Transaction(params: TransactionParams): Promise<any>;
        _dbConnection: Database;
      }
  
      declare interface BaseEdgeObjectInstance extends BaseObjectInstance, BaseEdge {
        [key: string]: any;
      }


      //DBO BASE DECLARATIONS

      interface UpdateOptions {
        keepNull: boolean;
        mergeObjects: boolean;
      }

      declare interface BaseDboInstance extends BaseVertex {
        update(params: PartialInstance<this>, options?: UpdateOptions): void;
        onGetOne: () => void;
        afterInitialize: () => void;
        reInitialize(params: PartialInstance<this>): void; 
        globalId: string;
        instanceName: string;
        modelDefaults: any;
        keyProps: BaseKeyProps;
      }
  
      // These are the methods of an Object constructor eg. UserDbo.findOne({id})
      declare interface BaseDbo <instance> {
        getSchema: () => any;
        create(params: PartialInstance<instance>): instance;
        create(from: any, to: any, params: PartialInstance<instance>): instance;
        getDocument(params: PartialInstance<instance>): instance;
        findOne(params: PartialInstance<instance>): instance;
        firstExample(params: PartialInstance<instance>): instance;
        find(params: any): ArangoDB.Cursor;
        initialize(params: PartialInstance<instance>): instance;
        extractKeyProps(params: PartialInstance<instance>): instance.keyProps;
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
        meta(params: any): QueryBuilder<T>;
        set(params: ModelUpdateParams<T>): QueryBuilder<T>;
        select(params: string[]): QueryBuilder<T>;
        paginate(pagination?: { page: number; limit: number }): QueryBuilder<T>;
        populate(association: string): QueryBuilder<T>;
        populate(association: string, filter: any): QueryBuilder<T>;
        fetch(): QueryBuilder<T>;
    }

    // These are the methods of an Object constructor eg. UserObject.findOne({id})
      declare interface BaseObject <instance> {
        create(params: PartialInstance<instance>, merchantcode?:string): WaterlinePromise<instance>;
        getDocument(params: PartialInstance<instance>, merchantcode?:string): WaterlinePromise<instance>;
        getOne(params: PartialInstance<instance>, merchantcode?:string): WaterlinePromise<instance>;
        findOne(params: any, merchantcode?:string): WaterlinePromise<instance>;
        findDocument(params: any, merchantcode?:string): WaterlinePromise<instance>;


        /**
         * initialize a new instance of the model object with the given properties and methods
         */
        initialize(params: instance, merchantcode?:string, initOne?:boolean): instance;

    }      

    // these are the mothods that are used by sails models. eg. User.create(params)

      declare interface BaseModelMethods <instance> {
        create(params: Partial<instance>): QueryBuilder<instance>;
        createEdge(
          params: PartialInstance<instance>,
          vertices: any,
        ): QueryBuilder<instance>;
        createEach(params: PartialInstance<instance>[]): QueryBuilder<instance[]>;
        findOne(
          params: string | ModelFindParams<instance> | OtherModelFindParams,
        ): QueryBuilder<instance>;
        findDocument(params: ModelFindParams<instance> | OtherModelFindParams): QueryBuilder<instance>;
        updateOne(params: string | ModelFindParams<instance> | OtherModelFindParams): QueryBuilder<instance>;
        updateOne(
          criteria: string | ModelFindParams<instance> |  OtherModelFindParams,
          params: ModelUpdateParams<instance>,
        ): QueryBuilder<instance>;
        find(
          params: ModelFindParams<instance> | FindObjectParams<instance> |  OtherModelFindParams,
        ): QueryBuilder<instance[]>;
        destroy(params: ModelFindParams<instance> |  OtherModelFindParams): QueryBuilder<instance[]>;
        sample(params?: any): QueryBuilder<instance[]>;
        findNear(params: any): QueryBuilder<instance[]>;
        count(params: ModelFindParams<instance> | OtherModelFindParams): WaterlinePromise<number>;
        avg(
          attribute: string,
          params: ModelFindParams<instance> | OtherModelFindParams,
        ): WaterlinePromise<number>;
        sum(
          atrribute: string,
          params: ModelFindParams<instance> | OtherModelFindParams,
        ): WaterlinePromise<number>;
        let(params: any): QueryBuilder<any>;
        findWithCount(
          params: ModelFindParams<instance> | FindObjectParams<instance>,
        ): QueryBuilder<FindWithCountResults>;
        upsert( params: ModelFindParams<instance> | OtherModelFindParams): QueryBuilder<instance[]>;
        normalize: (params: PartialInstance<instance>) => WaterlinePromise<instance>;
      }


      function getDocumentAsync<instance>(params: any, merchantcode?:string): WaterlinePromise<instance>;
      function getDocument<instance>(params: any): instance;

      declare const SystemSettings: {
        [key: string]: any;
      };
      `;

    return baseVertex;
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
      };
      
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
      interface ${globalId}ObjectInstance extends BaseObjectInstance, ${globalId}Props {
        getKeyProps(): ${globalId}KeyProps;
        keyProps: ${globalId}KeyProps;
      }

      // THESE ARE FOR WATERLINE MODELS
      declare let ${globalId}: BaseModelMethods<${globalId}ObjectInstance>;
      declare function _${globalId}(merchantcode: string): BaseModelMethods<${globalId}ObjectInstance>;


      interface ${globalId}Object extends BaseObject<${globalId}ObjectInstance> {
        globalId: '${globalId}';
        tableName: '${`${globalId}`.toLowerCase()}';
        classType: 'Vertex';
        prototype: ${globalId}ObjectInstance;
        [key: string]: any;
      }

      //We can override the below.
      // DBO
     
     interface ${globalId}DboInstance extends BaseDboInstance, ${globalId}Props {
        // [key: string]: any;
        globalId: '${globalId}';
        tableName: '${`${globalId}`.toLowerCase()}';
        keyProps: ${globalId}KeyProps;
        getKeyProps(): ${globalId}KeyProps;
      }

      interface ${globalId}Dbo extends BaseDbo<${globalId}DboInstance> {
        globalId: '${globalId}';
        tableName: '${`${globalId}`.toLowerCase()}';
        classType: 'Vertex';
        prototype: ${globalId}DboInstance;
        [key: string]: any;
      }


      let ${globalId}Object: ${globalId}Object;
      let ${globalId}Dbo: ${globalId}Dbo;


     
      // End Declarations for ${globalId}
      
      `;

    return iModel;
  },
};
