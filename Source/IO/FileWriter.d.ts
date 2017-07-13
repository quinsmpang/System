/// <reference types="node" />
import { WriteStream } from 'fs';
import { WriteStreamAdapter } from './Adapters/WriteStreamAdapter';
export declare class FileWriter extends WriteStreamAdapter<WriteStream, Buffer, Buffer> {
    readonly fileName: string;
    readonly bytesWritten: number;
    constructor(fileName: string);
    protected transform(chunk: Buffer): Promise<Buffer>;
}
