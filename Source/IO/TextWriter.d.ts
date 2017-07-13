/// <reference types="node" />
import { WriteStream } from 'fs';
import { WriteStreamAdapter } from './Adapters/WriteStreamAdapter';
import { Encoding } from '../Text/Encoding';
export declare class TextWriter extends WriteStreamAdapter<WriteStream, string, string> {
    readonly fileName: string;
    readonly bytesWritten: number;
    constructor(fileName: string, encoding?: Encoding);
    protected transform(chunk: string): Promise<string>;
}
