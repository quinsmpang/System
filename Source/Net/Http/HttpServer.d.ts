/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
import { HttpServerConfiguration } from './HttpServerConfiguration';
import { HttpResponse } from './HttpResponse';
import { HttpRequest } from './HttpRequest';
export declare class HttpServer {
    private _configuration;
    private _server;
    readonly configuration: HttpServerConfiguration;
    readonly isListening: boolean;
    constructor(serverConfiguration: HttpServerConfiguration);
    listen(): Promise<void>;
    stop(): Promise<void>;
    protected onRequest(req: IncomingMessage, res: ServerResponse): Promise<void>;
    protected getResponse(request: HttpRequest): Promise<HttpResponse>;
}
