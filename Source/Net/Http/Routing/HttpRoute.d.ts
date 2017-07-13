import { IHttpRoute } from './IHttpRoute';
import { HttpRouteValueDictionary } from './HttpRouteValueDictionary';
import { IHttpRequestHandler } from '../IHttpRequestHandler';
import { HttpRouteData } from './HttpRouteData';
import { IHttpRouteConstraint } from './IHttpRouteConstraint';
import { HttpRequest } from '../HttpRequest';
import { IEnumerable } from '@typescript-standard-library/core/Source/Collections/IEnumerable';
export declare class HttpRoute implements IHttpRoute {
    private _routeTemplate;
    private _handler;
    private _constraints;
    private _additionalValues;
    private _defaultValues;
    private _template;
    readonly routeTemplate: string;
    readonly handler: IHttpRequestHandler;
    readonly constraints: IEnumerable<IHttpRouteConstraint>;
    readonly additionalValues: HttpRouteValueDictionary;
    readonly defaultValues: HttpRouteValueDictionary;
    constructor(routeTemplate: string, handler: IHttpRequestHandler, defaultValues: HttpRouteValueDictionary, additionalValues: HttpRouteValueDictionary, constraints: IEnumerable<IHttpRouteConstraint>);
    getRouteData(request: HttpRequest): HttpRouteData;
    private extractRouteData(requestPath);
    private addDefaultValues(routeData);
    private addAdditionalValues(routeData);
}
