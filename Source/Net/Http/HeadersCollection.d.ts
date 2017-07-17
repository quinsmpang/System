import { Header } from './Header';
import { IEqualityComparator } from '@typescript-standard-library/core/Source/Collections/IEqualityComparator';
import { Enumerable } from '@typescript-standard-library/core/Source/Collections/Enumerable';
import { Collection } from '@typescript-standard-library/core/Source/Collections/Collection';
export declare class HeadersCollection extends Enumerable<Header> {
    private _headers;
    private _nameComparator;
    readonly nameComparator: IEqualityComparator<string>;
    constructor(nameComparator?: IEqualityComparator<string>);
    set(headerName: string, headerValue: string): void;
    getNames(): Collection<string>;
    find(headerName: string): string;
    findAll(headerName: string): Collection<string>;
    remove(headerName: string): void;
    contains(headerName: string): boolean;
    getIterator(): Iterator<Header>;
    private getSelector(headerName);
    private assertHeaderNameNotEmpty(headerName);
}
