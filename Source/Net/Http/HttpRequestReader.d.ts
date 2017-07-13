/// <reference types="node" />
import { IncomingMessage } from 'http';
import { Encoding } from '../../Text/Encoding';
import { HttpRequest } from './HttpRequest';
import { ReadStreamAdapter } from '../../IO/Adapters/ReadStreamAdapter';
export declare class HttpRequestReader extends ReadStreamAdapter<IncomingMessage, Buffer, Buffer> {
    private _request;
    readonly request: HttpRequest;
    constructor(stream: IncomingMessage);
    setEncoding(encoding: Encoding): void;
    close(): Promise<void>;
    protected transform(input: Buffer): Promise<Buffer>;
    private extractRequestMethod();
    private extractRequestUrl();
    private extractRequestHeaders();
}
