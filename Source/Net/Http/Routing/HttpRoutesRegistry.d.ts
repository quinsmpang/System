import { HttpRoutesCollection } from './HttpRoutesCollection';
import { IHttpRoute } from './IHttpRoute';
export declare class HttpRoutesRegistry {
    static readonly routes: HttpRoutesCollection;
    static registerRoute(route: IHttpRoute): void;
    private static _routes;
}
