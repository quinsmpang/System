import { QueryParamsCollection } from './QueryParamsCollection';
import { ICustomParser } from '@typescript-standard-library/core/Source/types';
export declare class QueryStringParser implements ICustomParser<QueryParamsCollection> {
    static parse(queryString: string): QueryParamsCollection;
    parse(queryString: string): QueryParamsCollection;
}
