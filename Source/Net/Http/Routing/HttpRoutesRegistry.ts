import {HttpRoutesCollection} from './HttpRoutesCollection';
import {IHttpRoute} from './IHttpRoute';
import {Assert} from '@typescript-standard-library/core/Source/Assertion/Assert';


export class HttpRoutesRegistry {
    public static get routes(): HttpRoutesCollection {
        if (this._routes == null) {
            this._routes = new HttpRoutesCollection();
        }

        return this._routes;
    }


    public static add(route: IHttpRoute): void {
        Assert.argument('route', route).notNull();

        this.routes.add(route);
    }


    private static _routes: HttpRoutesCollection;
}
