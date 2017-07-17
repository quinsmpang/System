import { HttpRoutesCollection } from './HttpRoutesCollection';
import { IHttpRoute } from './IHttpRoute';
export declare class HttpRoutesRegistry {
    static readonly routes: HttpRoutesCollection;
    static add(route: IHttpRoute): void;
    private static _routes;
}
