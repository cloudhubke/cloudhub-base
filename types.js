module.exports = {
  baseDeclarations: function () {
    const baseVertex = `

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
      //   properties: attributeProperty;
      //   required?: boolean | string[];
      //   additionalProperties?: additionalProperty;
      // }

      // interface modelAttribute {
      //   type: string;
      //   required?: boolean;
      //   isIn?: any[];
      //   rules?: attributeRules;
      //   defaultsTo?: any;
      //   key?: any;
      // }

      // interface ModelDefinition {
      //   tenantType?: string[];
      //   keyProps?: string[];
      //   indexes?: modelIndex[];
      //   // eslint-disable-next-line no-use-before-define
      //   attributes: modelAttribute;
      //   customToJSON?: () => void;
      //   beforeCreate?: (recordToCreate: any, proceed: () => void) => void;
      //   afterCreate?: (newlyCreatedRecord: any, proceed: () => void) => void;
      //   beforeUpdate?: (valuesToSet: any, proceed: () => void) => void;
      //   afterUpdate?: (updatedRecord: any, proceed: () => void) => void;
      //   beforeDestroy?: (criteria: any, proceed: () => void) => void;
      //   afterDestroy?: (destroyedRecord: any, proceed: () => void) => void;
      // }

    // END MODEL DEFINITION

      declare interface BaseVertex {
        id: string;
        _id: string;
        _key: string;
        createdAt: number,
        updatedAt: number,
        [key: string]: any;
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
        action(): any;
        writes: Array<string>;
        params: any;
      }
      
      declare const dbConnection: ArangoDB.Database;

      interface dbCollections extends ArangoDB.Database {
        [key: string]: ArangoDB.Collection;
      }

      interface dbVertextCollection extends BaseVertex {
        [key: string]: any;
      }

      interface dbEdgeCollection extends BaseEdge {
        [key: string]: any;
      }
      
      declare function Transaction(params: TransactionParams): Promise<any>;

      // An instance of an Object. Eg UserObject.

      interface ObjectUpdateOtions {
        keepNull: boolean;
        mergeObjects: boolean;
        trx: any;
      }

      type PartialInstance<T> = {
        [K in keyof T]?: T[K];
      }



      declare interface BaseObjectInstance extends BaseVertex {
        update(params: PartialInstance<this>, options:ObjectUpdateOtions): Promise<void>;
        destroy (params: any, options: ObjectUpdateOtions): Promise<void>;
        saveToCache: () => void;
        getDocument: (params: PartialInstance<this>) => Promise<this>;
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
        cache: boolean;
        globalId: string;
        classType: string;
        _Transaction: Transaction;
        _dbConnection: any;
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
        afterInitialize: () => void;
        reInitialize(params: PartialInstance<this>): void; 
        globalId: string;
        instanceName: string;
        modelDefaults: any;
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
        set(params: PartialInstance<T>): QueryBuilder<T>;
        paginate(pagination?: { page: number, limit: number }): QueryBuilder<T>;
        populate(association: string): QueryBuilder<T>;
        populate(association: string, filter: any): QueryBuilder<T>;
    }

    // These are the methods of an Object constructor eg. UserObject.findOne({id})
      declare interface BaseObject <instance> {
        create(params: PartialInstance<instance>): WaterlinePromise<instance>;
        getDocument(params: PartialInstance<instance>): WaterlinePromise<instance>;
        getOne(params: PartialInstance<instance>): WaterlinePromise<instance>;
        findOne(params: any): WaterlinePromise<instance>;
        findDocument(params: any): WaterlinePromise<instance>;
        initialize(params: instance): instance;
    }      

    // these are the mothods that are used by sails models. eg. User.create(params)

      declare interface BaseModelMethods <instance> {
        create(params: Partial<instance>): QueryBuilder<instance>;
        createEdge(params: PartialInstance<instance>, vertices: any): QueryBuilder<instance>;
        createEach(params: PartialInstance<instance>[]): QueryBuilder<instance[]>;
        findOne(params: any): QueryBuilder<instance>;
        updateOne(params: PartialInstance<instance>): QueryBuilder<instance>;
        updateOne(criteria: any, params:PartialInstance<instance>): QueryBuilder<instance>;
        find(params: any): QueryBuilder<instance[]>;
        destroy(params: any): QueryBuilder<instance[]>;
        sample(params: any): QueryBuilder<instance[]>;
        findNear(params: any): QueryBuilder<instance[]>;
        count(params: any): WaterlinePromise<number>;
        avg(params: any): WaterlinePromise<number>;
        sum(params: any): WaterlinePromise<number>;
        let(params: any): QueryBuilder<any>;
        findWithCount(params: any): QueryBuilder<FindWithCountResults>;
        upsert(params: any): QueryBuilder<instance[]>;
      }


      function getDocumentAsync<instance>(params: any): WaterlinePromise<instance>;
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

      type ${globalId}Attributes = typeof ${globalId}Definition.attributes;
      

      interface ${globalId}KeyProps extends BaseKeyProps {
        [key: string]: any;
      }

     
      // THESE ARE FOR WATERLINE MODELS
      declare let ${globalId}: BaseModelMethods<${globalId}.ObjectInstance>;
      declare function _${globalId}(merchantcode: string): BaseModelMethods<${globalId}.ObjectInstance>;


      //We can override the below.
      // DBOBJECTS
      interface ${globalId}ObjectInstance extends BaseObjectInstance {
        [key: string]: any;
        getKeyProps(): ${globalId}KeyProps;
        keyProps: ${globalId}KeyProps;
      }

      interface ${globalId}Object extends BaseObject<${globalId}ObjectInstance> {
        globalId: '${globalId}';
        tableName: '${`${globalId}`.toLowerCase()}';
        classType: 'Vertex';
        [key: string]: any;
      }

      //We can override the below.
      // DBO
     
     interface ${globalId}DboInstance extends BaseDboInstance {
        // [key: string]: any;
        keyProps: ${globalId}KeyProps;
        getKeyProps(): ${globalId}KeyProps;
      }

      interface ${globalId}Dbo extends BaseDbo<${globalId}DboInstance> {
        globalId: '${globalId}';
        tableName: '${`${globalId}`.toLowerCase()}';
        classType: 'Vertex';
        [key: string]: any;
      }

      let ${globalId}Object: ${globalId}Object;
      let ${globalId}Dbo: ${globalId}Dbo;
     
      // End Declarations for ${globalId}
      
      `;

    return iModel;
  },
};
