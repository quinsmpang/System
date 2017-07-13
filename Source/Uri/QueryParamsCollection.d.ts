import { KeyValueCollection } from '@typescript-standard-library/core/Source/Collections/KeyValueCollection';
import { IEquatable } from '@typescript-standard-library/core/Source/types';
export declare class QueryParamsCollection extends KeyValueCollection<string, string> implements IEquatable<QueryParamsCollection> {
    equals(other: QueryParamsCollection): boolean;
    toString(): string;
}
