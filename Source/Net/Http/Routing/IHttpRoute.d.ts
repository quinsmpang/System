import { IHttpRequestHandler } from '../IHttpRequestHandler';
import { HttpRequest } from '../HttpRequest';
import { IHttpRouteData } from './IHttpRouteData';
import { IHttpRouteConstraint } from './IHttpRouteConstraint';
import { IEnumerable } from '@typescript-standard-library/core/Source/Collections/IEnumerable';
import { IDictionary } from '@typescript-standard-library/core/Source/Collections/IDictionary';
export interface IHttpRoute {
    readonly constraints: IEnumerable<IHttpRouteConstraint>;
    readonly additionalValues: IDictionary<string, any>;
    readonly defaultValues: IDictionary<string, any>;
    readonly handler: IHttpRequestHandler;
    readonly routeTemplate: string;
    getRouteData(request: HttpRequest): IHttpRouteData;
}
