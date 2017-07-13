import { AcceptType } from './AcceptType';
import { Enumerable } from '@typescript-standard-library/core/Source/Collections/Enumerable';
export declare class AcceptTypesCollection extends Enumerable<AcceptType> {
    add(type: AcceptType): void;
    addType(mimeType: string, priority: number): void;
    contains(acceptType: AcceptType): boolean;
    containsType(mimeType: string): boolean;
    getTypePriority(mimeType: string): number;
    getTypeWithMaxPriority(): AcceptType;
}
