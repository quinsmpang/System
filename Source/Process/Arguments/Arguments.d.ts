import { OptionsCollection } from './OptionsCollection';
import { IEnumerable } from '@typescript-standard-library/core/Source/Collections/IEnumerable';
import { ReadOnlyCollection } from '@typescript-standard-library/core/Source/Collections/ReadOnlyCollection';
export declare class Arguments {
    static fromSegments(segments: IEnumerable<string>): Arguments;
    private static joinSegments(segments);
    private static escapeSegment(segment);
    private static isUnsafeSegment(segment);
    private _executablePath;
    private _mainModulePath;
    private _commands;
    private _options;
    readonly executablePath: string;
    readonly mainModulePath: string;
    readonly commands: ReadOnlyCollection<string>;
    readonly options: OptionsCollection;
    constructor(executablePath: string, mainModulePath: string, commands?: ReadOnlyCollection<string>, options?: OptionsCollection);
    toString(): string;
}
