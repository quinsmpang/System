import { IHttpRouteData } from './IHttpRouteData';
import { HttpRouteValueDictionary } from './HttpRouteValueDictionary';
import { IHttpRoute } from './IHttpRoute';
export declare class HttpRouteData implements IHttpRouteData {
    private _route;
    private _values;
    readonly route: IHttpRoute;
    readonly values: HttpRouteValueDictionary;
    constructor(route: IHttpRoute, values: HttpRouteValueDictionary);
}
