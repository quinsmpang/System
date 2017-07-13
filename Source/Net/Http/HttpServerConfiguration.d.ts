import { IHttpRequestHandler } from './IHttpRequestHandler';
import { IHttpErrorHandler } from './IHttpErrorHandler';
export declare class HttpServerConfiguration {
    private _host;
    private _port;
    private _backlogSize;
    private _maxHeadersCount;
    private _requestTimeout;
    private _keepAliveTimeout;
    private _requestHandler;
    private _errorHandler;
    host: string;
    port: number;
    backlogSize: number;
    maxHeadersCount: number;
    requestTimeout: number;
    keepAliveTimeout: number;
    requestHandler: IHttpRequestHandler;
    errorHandler: IHttpErrorHandler;
    constructor(host: string, port: number);
}
