import {HeadersCollection} from './HeadersCollection';
import {Writable} from '../../Stream/Writable';
import {IDisposable} from '@typescript-standard-library/core/Source/types';


export abstract class HttpContent implements IDisposable {
    private _isDisposed: boolean = false;
    private _headers: HeadersCollection = new HeadersCollection();


    public get headers(): HeadersCollection {
        return this._headers;
    }


    public get isDisposed(): boolean {
        return this._isDisposed;
    }


    public dispose(): void {
        this._isDisposed = true;
    }


    public abstract copyTo(writer: Writable<Buffer, any>): Promise<void>;
}
