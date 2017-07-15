import { PathPattern } from './PathPattern';
import { FileSystemEntryProcessor, FileSystemEntrySelector } from './types';
export declare class FileSystemWalker {
    private _depth;
    private _pathPatterns;
    private _entrySelectors;
    depth: number;
    addPathPattern(pattern: PathPattern): void;
    addEntrySelector(entrySelector: FileSystemEntrySelector): void;
    walk(startDirectory: string, entryProcessor: FileSystemEntryProcessor): Promise<void>;
    private processDirectory(context);
    private processEntry(entry, context);
    private entryMatchesPathPatterns(entry);
    private entryMatchesSelectors(entry);
}
