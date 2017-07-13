import { IHttpRoute } from './IHttpRoute';
import { IDictionary } from '@typescript-standard-library/core/Source/Collections/IDictionary';
export interface IHttpRouteData {
    readonly route: IHttpRoute;
    readonly values: IDictionary<string, object>;
}
