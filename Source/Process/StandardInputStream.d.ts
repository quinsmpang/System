/// <reference types="node" />
import { WriteStreamAdapter } from '../IO/Adapters/WriteStreamAdapter';
import { Writable } from 'stream';
export declare class StandardInputStream extends WriteStreamAdapter<Writable, Buffer, Buffer> {
    protected transform(input: Buffer): Promise<Buffer>;
}
