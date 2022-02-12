/* eslint-disable @typescript-eslint/no-empty-interface */
declare namespace Upstream {
  interface UpstreamFile {
    fd: any;
    size: number;
    type: string;
    filename: string;
    status: string;
    field: string;
    extra: any;
    stream: NodeJS.ReadableStream;
  }

  interface UpstreamCallback {
    (err: Error, files: UpstreamFile[]): void;
  }

  export interface Upstream extends NodeJS.ReadableStream {
    upload(opts: any, cb: UpstreamCallback): void;
  }
}

declare namespace Express {
  interface RequestOpts extends waterline.Dictionary<any> {
    values: any;
    where: any;
    populate?: any;
    mirror?: boolean;
    associations?: any | any[];
  }

  export interface Request {
    options: RequestOpts;
    allParams(): any;
    file(field: string): Upstream.Upstream;
    isSocket: boolean;
    wantsJSON: boolean;
    // eslint-disable-next-line no-use-before-define
    _sails: Sails.SailsObject;
  }

  interface ResponseHandlerFn {
    (data: any, pathToView?: string): void;
  }

  export interface Response {
    badRequest: ResponseHandlerFn;
    forbidden: ResponseHandlerFn;
    negotiate: (err: any) => void;
    notFound(data: any, pathToView?: string): void;
    notFound(): void;
    created(instance: any): void;
    ok: ResponseHandlerFn;
    serverError: ResponseHandlerFn;
    view(pathToView: string): void;
    view(pathToView: string, locals: any): void;
    view(locals: any): void;
    view(): void;
    send(data: any): void;
    status(statusCode: number): Response;
  }
}
declare namespace winston {
  export interface LoggerInstance {
    silly: (message: string, ...args: any[]) => LoggerInstance;
  }
}

interface ManagerInstance {
  dbConnection: any;
  dsName: any;
  createDatabase: (params: {
    rootPassword: string | undefined;
    dbName: string;
  }) => Promise<void>;
  Transaction(params: TransactionParams): Promise<any>;
}

interface DataStoreInstance {
  manager: ManagerInstance;
}

declare namespace Sails {
  interface Dictionary<T> {
    [k: string]: T;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface SailsLogger extends winston.LoggerInstance {}

  interface BlueprintsConfig {
    populate: boolean;
    actions: boolean;
    index: boolean;
    shortcuts: boolean;
    rest: boolean;
    prefix: string;
    restPrefix: string;
    pluralize: boolean;
    autoWatch: boolean;
    mirror: boolean;
    defaultLimit?: number;
  }

  interface DBConnectionConfig {
    adapter: string;
    host?: string;
    port?: string;
    user?: string;
    password?: string;
    database?: string;
    keepAlive?: boolean;
    sniffOnStart?: boolean;
    maxRetries?: number;
    deadTimeout?: number;
    sniffOnConnectionFault?: boolean;
    apiVersion?: string;
  }

  interface ConnectionsConfig {
    [con: string]: DBConnectionConfig;
  }

  interface CorsConfig {
    allRoutes: boolean;
    origin: string;
    credentials: boolean;
    methods: string;
    headers: string;
    exposeHeaders: string;
    securityLevel: number;
  }

  interface GlobalsConfig {
    _: boolean;
    sails: boolean;
    adapters: boolean;
    models: boolean;
    services: boolean;
    controllers: boolean;
  }

  interface I18nConfig {
    locales: string[];
    defaultLocale: string;
    localesDirectory: string;
    cookie?: any;
    directory: string;
    updateFiles: boolean;
    extension: string;
    requestLocale: string;
  }

  interface LogConfig {
    level: string;
  }

  interface ModelsConfig {
    connection: string;
    migrate: string;
  }

  interface hookTimeout {
    _hookTimeout: number;
  }

  interface OrmConfig extends hookTimeout {}

  interface PubsubConfig extends hookTimeout {}

  interface ValidationConfig extends hookTimeout {}

  interface CsrfToken {
    cors: {
      origin: string;
      credentials: boolean;
    };
  }

  interface Routes extends Dictionary<Record<string, unknown> | string> {
    "/csrfToken": CsrfToken;
  }

  interface SocketsConfig {
    adapterOptions: Dictionary<string>;
    sendResponseHeaders: boolean;
    sendStatusCode: boolean;
    grant3rdPartyCookie: boolean;
    path: string;
    serveClient: boolean;
    pingTimeout: number;
    pingInterval: number;
    maxHttpBufferSize: number;
    transports: string[];
    allowUpgrades: boolean;
    cookie: boolean;
  }

  interface PathsConfig {
    tmp: string;
    config: string;
    controllers: string;
    policies: string;
    services: string;
    adapters: string;
    models: string;
    hooks: string;
    blueprints: string;
    responses: string;
    views: string;
    layout: string;
    public: string;
  }

  interface CsrfConfig {
    grantTokenViaAjax: boolean;
    protectionEnabled: boolean;
    origin: string;
    routesDisabled: string;
    route: string;
  }

  interface CacheConfig {
    maxAge: number;
  }

  interface SailsConfig extends waterline.Dictionary<any> {
    blueprints: BlueprintsConfig;
    connections: ConnectionsConfig;
    cors: CorsConfig;
    globals: GlobalsConfig;
    i18n: I18nConfig;
    port: number;
    host: string;
    explicitHost: string;
    log: LogConfig;
    models: ModelsConfig;
    orm: OrmConfig;
    pubsub: PubsubConfig;
    validation: ValidationConfig;
    routes: Routes;
    sockets: SocketsConfig;
    environment: string;
    appPath: string;
    paths: PathsConfig;
    middleware: Dictionary<() => void>;
    config: string;
    csrf: CsrfConfig;
    cache: CacheConfig;
    ssl: any;
  }

  interface SailsHooks extends Dictionary<any> {
    pubsub: any;
  }

  interface SailsSockets {
    // http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/sails-sockets-blast
    blast(data: any, socketToOmit?: SocketIO.Socket): void;
    blast(eventName: string, data: any, socketToOmit: SocketIO.Socket): void;

    // http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/sails-sockets-broadcast
    broadcast(roomName: string, data: any): void;
    broadcast(roomName: string, eventName: string, data: any): void;
    broadcast(roomName: string, data: any, socketToOmit: SocketIO.Socket): void;
    broadcast(
      roomName: string,
      eventName: string,
      data: any,
      socketToOmit: SocketIO.Socket
    ): void;

    // http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/sails-sockets-join
    join(socket: SocketIO.Socket, roomName: string): boolean;
    join(sockets: SocketIO.Socket[], roomName: string): boolean;

    // http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/sails-sockets-emit
    emit(socketIds: string[], eventName: string, messageData: any): void;

    // http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/sails-sockets-id
    id(socket: SocketIO.Socket): string;

    // http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/sails-sockets-leave
    leave(socket: SocketIO.Socket, roomName: string): boolean;
    leave(sockets: SocketIO.Socket[], roomName: string): boolean;

    // http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/sails-sockets-rooms
    rooms(): string[];

    // http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/sails-sockets-socket-rooms
    socketRooms(socket: SocketIO.Socket): string[];

    // http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/sails-sockets-subscribers
    subscribers(roomName: string): string[];
  }

  // extending express as a namespace sucks;
  // the drawback here is that you must manually include all the definitions where
  // the express Request is extended
  // this interface should be enough for handling requests;
  // since the express request doesn't expose all the properties without
  // requiring it as a module; and also, on sails, the request's socket property
  // is actually a SailsIo.Socket type, and this cannot be written on a express request object
  export interface SailsRequest {
    readable: boolean;
    domain: any;
    writable: boolean;
    allowHalfOpen: boolean;
    method: string;
    url: string;
    headers: Dictionary<string>;
    rawHeaders: string[];
    params: any;
    query: Dictionary<string>;
    body: any;
    file(field: string): Upstream.Upstream;

    // imported from multer
    files: {
      [fieldname: string]: Express.Multer.File | Express.Multer.File[];
    };
    /** */

    /* imported from passport */
    authInfo?: any;
    user?: any;
    // These declarations are merged into express's Request type
    login(user: any, done: (err: any) => void): void;
    login(
      user: any,
      options: Record<string, unknown>,
      done: (err: any) => void
    ): void;
    logIn(user: any, done: (err: any) => void): void;
    logIn(
      user: any,
      options: Record<string, unknown>,
      done: (err: any) => void
    ): void;

    logout(): void;
    logOut(): void;

    isAuthenticated(): boolean;
    isUnauthenticated(): boolean;
    /** */

    /**
     * Return the value of param `name` when present or `defaultValue`.
     *
     *  - Checks route placeholders, ex: _/user/:id_
     *  - Checks body params, ex: id=12, {"id":12}
     *  - Checks query string params, ex: ?id=12
     *
     * To utilize request bodies, `req.body`
     * should be an object. This can be done by using
     * the `connect.bodyParser()` middleware.
     *
     * @param name
     * @param defaultValue
     */
    param(name: string, defaultValue?: any): string;

    wantsJSON: boolean;
    transport: string;
    protocol: string;
    isSocket: boolean;
    ip: string;
    port: number;
    socket: SocketIO.Socket;
    secret: string;
    cookies: any;
    signedCookies: any;
    sessionStore: any;
    sessionID: string;
    session: any;
    route: any;
    options: any;
    allParams(): any;
    flash(message: string, data: any): void;
    baseUrl: string;
    validate(cb: (err: Error) => void): void;
    languages: string[];
    regions: string[];
    language: string;
    region: string;
    locale: string;
    getLocale(): string;
    setLocale(locale: string): void;
    getCatalog(): Dictionary<string>;
    _sails: Sails.SailsObject;
  }

  export interface SailsResponse extends Express.Response {}

  // should be extended at app level to provide models and services
  // maybe controllers to?
  export interface SailsObject {
    config: SailsConfig;
    // will be implemented by used
    models: any;
    // will be implemented by used
    controllers: any;
    // will be implemented by used
    services: any;
    io: SocketIO.Server;
    sockets: SailsSockets;
    log: SailsLogger;
    hooks: SailsHooks;
    // ToDO: document this
    util: any;
    getDatastore(merchantcode?: string): DataStoreInstance;
  }
}

// declare module 'sails' {
//   export const sails: Sails.SailsObject;
// }

interface SailsRequest extends Sails.SailsRequest {}
interface SailsResponse extends Sails.SailsResponse {}

declare const sails: Sails.SailsObject;
