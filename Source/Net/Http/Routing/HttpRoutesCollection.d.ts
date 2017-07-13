import { IHttpRoute } from './IHttpRoute';
import { IHttpRouteData } from './IHttpRouteData';
import { HttpRequest } from '../HttpRequest';
import { Collection } from '@typescript-standard-library/core/Source/Collections/Collection';
export declare class HttpRoutesCollection extends Collection<IHttpRoute> {
    getRouteData(request: HttpRequest): IHttpRouteData;
}
