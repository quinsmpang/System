import { IHttpRequestHandler } from '../IHttpRequestHandler';
import { HttpRoutesCollection } from './HttpRoutesCollection';
import { HttpRequest } from '../HttpRequest';
import { HttpResponse } from '../HttpResponse';
export declare class HttpRoutingDispatcher implements IHttpRequestHandler {
    private _routes;
    private _defaultHandler;
    readonly routes: HttpRoutesCollection;
    readonly defaultHandler: IHttpRequestHandler;
    constructor(routes: HttpRoutesCollection, defaultHandler: IHttpRequestHandler);
    send(request: HttpRequest): Promise<HttpResponse>;
}
