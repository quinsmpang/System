/// <reference types="node" />
import { FileSystemEntry } from './FileSystemEntry';
import { AccessPermissions } from './AccessPermissions';
import { FileMode } from './FileMode';
import { AccessMode } from './AccessMode';
import { FileDescriptor } from './types';
import { ReadOnlyCollection } from '@typescript-standard-library/core/Source/Collections/ReadOnlyCollection';
export declare class FileSystem {
    static getEntry(fullName: string): Promise<FileSystemEntry>;
    static createFile(fileName: string, accessPermissions?: AccessPermissions, truncate?: boolean, overwrite?: boolean): Promise<void>;
    static writeFile(fileName: string, fileContent: Buffer, accessPermissions?: AccessPermissions): Promise<void>;
    static readFile(fileName: string): Promise<Buffer>;
    static removeFile(fullName: string): Promise<void>;
    static fileExists(fileName: string): Promise<boolean>;
    static createDirectory(directoryName: string, accessPermissions?: AccessPermissions): Promise<void>;
    static readDirectory(directoryName: string): Promise<ReadOnlyCollection<FileSystemEntry>>;
    static removeDirectory(directoryName: string): Promise<void>;
    static directoryExists(directoryName: string): Promise<boolean>;
    static checkAccess(fullName: string, accessMode?: AccessMode): Promise<void>;
    static getPermissions(fullName: string): Promise<AccessPermissions>;
    static setPermissions(fullName: string, accessPermissions: AccessPermissions): Promise<void>;
    static setOwner(fullName: string, userId: number, groupId: number): Promise<void>;
    static createSymbolicLink(fullName: string, linkName: string): Promise<void>;
    static createLink(fullName: string, linkName: string): Promise<void>;
    static readLink(linkName: string): Promise<string>;
    static getAbsolutePath(path: string): Promise<string>;
    static move(sourceName: string, destinationName: string): Promise<void>;
    static open(fullName: string, fileMode?: FileMode, accessPermissions?: AccessPermissions): Promise<FileDescriptor>;
    static close(fileDescriptor: FileDescriptor): Promise<void>;
    static read(fileDescriptor: FileDescriptor, position: number, length: number): Promise<Buffer>;
    static write(fileDescriptor: FileDescriptor, position: number, buffer: Buffer): Promise<number>;
    static flush(fileDescriptor: FileDescriptor): Promise<void>;
}
