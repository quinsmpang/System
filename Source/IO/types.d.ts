import { FileSystemEntry } from './FileSystemEntry';
import { FileSystemWalkerContext } from './FileSystemWalkerContext';
export declare type FileDescriptor = number;
export declare type FileSystemEntrySelector = (entry: FileSystemEntry) => boolean;
export declare type FileSystemEntryProcessor = (entry: FileSystemEntry, context: FileSystemWalkerContext) => Promise<void>;
