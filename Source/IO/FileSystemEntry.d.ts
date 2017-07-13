/// <reference types="node" />
import { AccessPermissions } from './AccessPermissions';
import { Stats } from 'fs';
import { FileSystemEntryType } from './FileSystemEntryType';
import { IFileSystemEntry } from './IFileSystemEntry';
import { DateTime } from '@typescript-standard-library/core/Source/Time/DateTime';
export declare class FileSystemEntry implements IFileSystemEntry {
    protected _stats: Stats;
    private _creationTime;
    private _lastWriteTime;
    private _lastChangeTime;
    private _lastAccessTime;
    private _accessPermissions;
    private _entryType;
    private _path;
    readonly entryType: FileSystemEntryType;
    readonly path: string;
    readonly directoryName: string;
    readonly baseName: string;
    readonly baseNameWithoutExtension: string;
    readonly extension: string;
    readonly root: string;
    readonly creationTime: DateTime;
    readonly lastWriteTime: DateTime;
    readonly lastChangeTime: DateTime;
    readonly lastAccessTime: DateTime;
    readonly deviceId: number;
    readonly specialDeviceId: number;
    readonly inode: number;
    readonly accessPermissions: AccessPermissions;
    readonly ownerUserId: number;
    readonly ownerGroupId: number;
    readonly length: number;
    readonly hardLinksCount: number;
    readonly sizeOfAllocatedBlock: number;
    readonly countOfAllocatedBlocks: number;
    constructor(path: string, stats: Stats);
}
