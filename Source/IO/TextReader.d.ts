/// <reference types="node" />
import { ReadStream } from 'fs';
import { Encoding } from '../Text/Encoding';
import { ReadStreamAdapter } from './Adapters/ReadStreamAdapter';
export declare class TextReader extends ReadStreamAdapter<ReadStream, string, string> {
    readonly fileName: string;
    readonly bytesRead: number;
    constructor(fileName: string, encoding?: Encoding);
    close(): Promise<void>;
    protected transform(input: string): Promise<string>;
}
