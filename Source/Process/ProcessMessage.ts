import * as net from 'net';
import {Assert} from '@typescript-standard-library/core/Source/Assertion/Assert';


export class ProcessMessage {
    private _message: object | string | number;
    private _handle: net.Socket | net.Server = null;
    private _keepOpen: boolean = false;


    public get message(): object | string | number {
        return this._message;
    }


    public set message(value: object | string | number) {
        Assert.argument('value', value).notNull();

        this._message = value;
    }


    public get handle(): net.Socket | net.Server {
        return this._handle;
    }


    public set handle(value: net.Socket | net.Server) {
        this._handle = value;
    }


    public get keepOpen(): boolean {
        return this._keepOpen;
    }


    public set keepOpen(value: boolean) {
        Assert.argument('value', value).notNull();

        this._keepOpen = value;
    }


    public constructor(message: object | string | number) {
        Assert.argument('message', message).notNull();

        this._message = message;
    }
}
