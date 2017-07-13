/// <reference types="node" />
import { ServerResponse } from 'http';
import { HttpResponse } from './HttpResponse';
import { WriteStreamAdapter } from '../../IO/Adapters/WriteStreamAdapter';
export declare class HttpResponseWriter extends WriteStreamAdapter<ServerResponse, Buffer, Buffer> {
    send(response: HttpResponse): Promise<void>;
    protected transform(input: Buffer): Promise<Buffer>;
    private setStatus(statusCode, statusMessage?);
    private setHeaders(headers);
    private writeContent(content);
}
