/// <reference types="node" />
import { Writable as WritableStream } from 'stream';
import { IStreamAdapter } from '../../Stream/IStreamAdapter';
import { Writable } from '../../Stream/Writable';
import { IDisposable } from '@typescript-standard-library/core/Source/types';
export declare abstract class WriteStreamAdapter<TStream extends WritableStream, TIn, TOut> extends Writable<TIn, TOut> implements IStreamAdapter<TStream>, IDisposable {
    private _isDisposed;
    private _isFinished;
    private _isClosed;
    private _baseStream;
    readonly baseStream: TStream;
    readonly isWritable: boolean;
    readonly isFinished: boolean;
    readonly isClosed: boolean;
    readonly isDisposed: boolean;
    constructor(baseStream: TStream);
    dispose(): void;
    close(): Promise<void>;
    protected abstract transform(input: TIn): Promise<TOut>;
    protected _write(output: TOut): Promise<void>;
    private onFinish();
    private onClose();
}
