/// <reference types="node" />
import { Readable } from 'stream';
import { ReadStreamAdapter } from '../IO/Adapters/ReadStreamAdapter';
export declare class StandardErrorStream extends ReadStreamAdapter<Readable, Buffer, Buffer> {
    protected transform(input: Buffer): Promise<Buffer>;
}
