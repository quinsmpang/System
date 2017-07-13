import { HttpRequestReader } from '../HttpRequestReader';
import { IHttpRoute } from './IHttpRoute';
import { HttpRouteValueDictionary } from './HttpRouteValueDictionary';
export interface IHttpRouteConstraint {
    match(request: HttpRequestReader, route: IHttpRoute, parameterName: string, values: HttpRouteValueDictionary): boolean;
}
