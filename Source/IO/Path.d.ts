import { ICloneable, IJSONSerializable } from '@typescript-standard-library/core/Source/types';
import { IEnumerable } from '@typescript-standard-library/core/Source/Collections/IEnumerable';
export declare class Path implements ICloneable<Path>, IJSONSerializable<string> {
    static isAbsolute(path: string): boolean;
    static relative(from: string, to: string): string;
    static resolve(segments: IEnumerable<string>): string;
    static concat(segments: IEnumerable<string>): string;
    static split(path: string): string[];
    private _parsedPath;
    private _originalPath;
    readonly originalPath: string;
    readonly directoryName: string;
    readonly baseName: string;
    readonly baseNameWithoutExtension: string;
    readonly extension: string;
    readonly root: string;
    readonly isAbsolute: boolean;
    constructor(path: string);
    clone(): Path;
    toString(): string;
    toJSON(): string;
}
