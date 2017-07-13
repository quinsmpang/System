import { Option } from './Option';
import { Enumerable } from '@typescript-standard-library/core/Source/Collections/Enumerable';
export declare class OptionsCollection extends Enumerable<Option> {
    contains(key: string): boolean;
    find(key: string): Option;
    findAll(key: string): OptionsCollection;
    getValue(key: string): string | boolean;
}
