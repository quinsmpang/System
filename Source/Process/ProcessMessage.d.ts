/// <reference types="node" />
import * as net from 'net';
export declare class ProcessMessage {
    private _message;
    private _handle;
    private _keepOpen;
    message: object | string | number;
    handle: net.Socket | net.Server;
    keepOpen: boolean;
    constructor(message: object | string | number);
}
