module.exports = {
  baseDeclarations: function () {
    const baseVertex = `

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

      declare interface BaseObjectInstance extends BaseVertex {
        update(params: any, options:ObjectUpdateOtions): Promise<void>;
        destroy (params: any, options: ObjectUpdateOtions): Promise<void>;
        saveToCache: () => void;
        getDocument: (params: any) => Promise<BaseObjectInstance>;
        nextId: (name: string) => Promise<number>;
        onDelete: () => Promise<void>;
        onCreate: () => Promise<void>;
        onUpdate: () => Promise<void>;
        onGetOne: () => Promise<void>;
        onCreateOrUpdate: () => Promise<void>;
        afterInitialize: () => void;
        reInitialize(params: any): void; 
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
        update(params: any, options?: UpdateOptions): void;
        afterInitialize: () => void;
        reInitialize(params: any): void; 
        globalId: string;
        instanceName: string;
        modelDefaults: any;
      }
  
      // These are the methods of an Object constructor eg. UserDbo.findOne({id})
      declare interface BaseDbo <instance> {
        getSchema: () => any;
        create(params: any): instance;
        create(from: any, to: any, params: any): instance;
        getDocument(params: any): instance;
        findOne(params: any): instance;
        firstExample(params: any): instance;
        find(params: any): ArangoDB.Cursor;
        initialize(params: any): instance;
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
        set(params: any): QueryBuilder<T>;
        paginate(pagination?: { page: number, limit: number }): QueryBuilder<T>;
        populate(association: string): QueryBuilder<T>;
        populate(association: string, filter: any): QueryBuilder<T>;
    }

    // These are the methods of an Object constructor eg. UserObject.findOne({id})
      declare interface BaseObject <instance> {
        create(params: any): WaterlinePromise<instance>;
        getDocument(params: any): WaterlinePromise<instance>;
        getOne(params: any): WaterlinePromise<instance>;
        findOne(params: any): WaterlinePromise<instance>;
        findDocument(params: any): WaterlinePromise<instance>;
        initialize(params: any): instance;
    }      

    // these are the mothods that are used by sails models. eg. User.create(params)
      declare interface BaseModelMethods <instance> {
        create(params: any): QueryBuilder<instance>;
        createEdge(params: any, vertices: any): QueryBuilder<instance>;
        createEach(params: any): QueryBuilder<instance[]>;
        findOne(params: any): QueryBuilder<instance>;
        updateOne(params: any): QueryBuilder<instance>;
        updateOne(criteria: any, params:any): QueryBuilder<instance>;
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
        [key: string]: any;
      }

      declare let ${globalId}Object: ${globalId}Object;
      declare let ${globalId}Dbo: ${globalId}Dbo;
     
      // End Declarations for ${globalId}
      
      `;

    return iModel;
  },
};
