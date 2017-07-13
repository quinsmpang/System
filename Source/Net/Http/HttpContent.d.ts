/// <reference types="node" />
import { HeadersCollection } from './HeadersCollection';
import { Writable } from '../../Stream/Writable';
import { IDisposable } from '@typescript-standard-library/core/Source/types';
export declare abstract class HttpContent implements IDisposable {
    private _isDisposed;
    private _headers;
    readonly headers: HeadersCollection;
    readonly isDisposed: boolean;
    dispose(): void;
    abstract copyTo(writer: Writable<Buffer, any>): Promise<void>;
}
