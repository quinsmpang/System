/// <reference types="node" />
import { Readable as ReadableStream } from 'stream';
import { IStreamAdapter } from '../../Stream/IStreamAdapter';
import { Readable } from '../../Stream/Readable';
import { IDisposable } from '@typescript-standard-library/core/Source/types';
export declare abstract class ReadStreamAdapter<TStream extends ReadableStream, TIn, TOut> extends Readable<TIn, TOut> implements IStreamAdapter<TStream>, IDisposable {
    private _isDisposed;
    private _isClosed;
    private _baseStream;
    readonly baseStream: TStream;
    readonly isReadable: boolean;
    readonly isClosed: boolean;
    readonly isDisposed: boolean;
    constructor(baseStream: TStream);
    dispose(): void;
    protected awaitClose(): Promise<void>;
    protected onClose(): void;
    protected onEnd(): void;
    protected abstract transform(input: TIn): Promise<TOut>;
    protected _read(): Promise<TIn>;
    private scheduleRead(deferred);
}
