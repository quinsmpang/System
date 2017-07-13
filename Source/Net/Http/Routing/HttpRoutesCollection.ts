import {IHttpRoute} from './IHttpRoute';
import {IHttpRouteData} from './IHttpRouteData';
import {HttpRequest} from '../HttpRequest';
import {Collection} from '@typescript-standard-library/core/Source/Collections/Collection';


export class HttpRoutesCollection extends Collection<IHttpRoute> {
    public getRouteData(request: HttpRequest): IHttpRouteData {
        for (let route of this) {
            let routeData = route.getRouteData(request);

            if (routeData != null) {
                return routeData;
            }
        }

        return null;
    }
}
