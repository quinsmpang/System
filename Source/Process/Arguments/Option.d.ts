import { KeyValuePair } from '@typescript-standard-library/core/Source/Collections/KeyValuePair';
export declare class Option extends KeyValuePair<string, string | boolean> {
    readonly isLogical: boolean;
    toString(): string;
    private getSafeValue();
}
