import { FileSystemEntryProcessor } from './types';
import { FileSystemEntry } from './FileSystemEntry';
export declare class FileSystemWalkerContext {
    private _isCancelled;
    private _startDirectory;
    private _entryProcessor;
    private _currentDirectory;
    private _currentLevel;
    readonly startDirectory: string;
    currentDirectory: string;
    readonly entryProcessor: FileSystemEntryProcessor;
    currentLevel: number;
    readonly isCancelled: boolean;
    constructor(startDirectory: string, entryProcessor: FileSystemEntryProcessor);
    cancel(): void;
    processEntry(entry: FileSystemEntry): Promise<void>;
}
