import {Writable as WritableStream} from 'stream';
import {IStreamAdapter} from '../../Stream/IStreamAdapter';
import {Writable} from '../../Stream/Writable';
import {EndOfStreamException} from '../EndOfStreamException';
import {IDisposable} from '@typescript-standard-library/core/Source/types';
import {Assert} from '@typescript-standard-library/core/Source/Assertion/Assert';
import {DeferredObject} from '@typescript-standard-library/core/Source/Async/DeferredObject';
import {Method} from '@typescript-standard-library/core/Source/Language/Decorators/Method';


export abstract class WriteStreamAdapter<TStream extends WritableStream, TIn, TOut>
    extends
        Writable<TIn, TOut>
    implements
        IStreamAdapter<TStream>, IDisposable {

    private _isDisposed: boolean;
    private _isFinished: boolean;
    private _isClosed: boolean;
    private _baseStream: TStream;


    public get baseStream(): TStream {
        return this._baseStream;
    }


    public get isWritable(): boolean {
        return this.baseStream.writable;
    }


    public get isFinished(): boolean {
        return this._isFinished;
    }


    public get isClosed(): boolean {
        return this._isClosed;
    }


    public get isDisposed(): boolean {
        return this._isDisposed;
    }


    public constructor(baseStream: TStream) {
        Assert.argument('baseStream', baseStream).notNull();

        super();

        this._isDisposed = false;
        this._isFinished = false;
        this._isClosed = false;
        this._baseStream = baseStream;

        this.baseStream.addListener('finish', this.onFinish);
        this.baseStream.addListener('close', this.onClose);
    }


    public dispose(): void {
        this._isDisposed = true;
    }


    public close(): Promise<void> {
        let deferred: DeferredObject = new DeferredObject();

        this.baseStream.end((error: Error): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    protected abstract transform(input: TIn): Promise<TOut>;


    protected _write(output: TOut): Promise<void> {
        let deferred: DeferredObject = new DeferredObject();

        if (this.isClosed) {
            deferred.reject(new EndOfStreamException(`Unable to write to closed stream.`));
        } else if (this.isFinished) {
            deferred.reject(new EndOfStreamException(`Unable to write to stream after streaming was finished.`));
        } else {
            this.baseStream.write(output, (error: NodeJS.ErrnoException) => {
                if (error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve();
                }
            });
        }

        return deferred.promise;
    }


    @Method.attached()
    private onFinish(): void {
        this._isFinished = true;
    }


    @Method.attached()
    private onClose(): void {
        this._isClosed = true;
    }
}
