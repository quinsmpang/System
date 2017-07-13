import { HttpRequestReader } from '../HttpRequestReader';
import { IFilter } from './IFilter';
export interface IActionFilter extends IFilter {
    executeActionFilter(request: HttpRequestReader): Promise<boolean>;
}
