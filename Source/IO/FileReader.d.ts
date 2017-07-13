/// <reference types="node" />
import { ReadStream } from 'fs';
import { ReadStreamAdapter } from './Adapters/ReadStreamAdapter';
export declare class FileReader extends ReadStreamAdapter<ReadStream, Buffer, Buffer> {
    readonly fileName: string;
    readonly bytesRead: number;
    constructor(fileName: string, start?: number, end?: number);
    close(): Promise<void>;
    protected transform(chunk: Buffer): Promise<Buffer>;
}
