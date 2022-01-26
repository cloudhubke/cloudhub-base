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

      declare interface BaseObjectInstance extends BaseVertex {
        update(params: any): Promise<void>;
        destroy (params: any): Promise<void>;
        getKeyProps(): BaseKeyProps;
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
        keyProps: BaseKeyProps;
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

      declare interface BaseObject <instance> {
        create(params: any): WaterlinePromise<instance>;
        getDocument(params: any): WaterlinePromise<instance>;
        getOne(params: any): WaterlinePromise<instance>;
        findOne(params: any): WaterlinePromise<instance>;
        findDocument(params: any): WaterlinePromise<instance>;
        initialize(params: any): WaterlinePromise<instance>;
    }      

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
        ${collectionName}: dbVertextCollection;`;
      }
      return collections;
    }

    let dbCollections = `
      declare interface db extends dbCollections {
          ${renderCollections()}
          _query: 
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

      interface ${globalId}ObjectInstance extends BaseObjectInstance {
        [key: string]: any;
      }

      interface ${globalId}Object extends BaseObject<${globalId}ObjectInstance> {
        [key: string]: any;
      }

      declare const ${globalId}: BaseModelMethods<${globalId}ObjectInstance>;
      declare function _${globalId}(merchantcode: string): BaseModelMethods<${globalId}ObjectInstance>;

      declare const ${globalId}Object: ${globalId}Object;

     
      // End Declarations for ${globalId}
      
      `;

    return iModel;
  },
};
