import {Readable as ReadableStream} from 'stream';
import {IStreamAdapter} from '../../Stream/IStreamAdapter';
import {Readable} from '../../Stream/Readable';
import {IOException} from '../IOException';
import {EndOfStreamException} from '../EndOfStreamException';
import {IDisposable} from '@typescript-standard-library/core/Source/types';
import {Assert} from '@typescript-standard-library/core/Source/Assertion/Assert';
import {DeferredObject} from '@typescript-standard-library/core/Source/Async/DeferredObject';
import {Method} from '@typescript-standard-library/core/Source/Language/Decorators/Method';


export abstract class ReadStreamAdapter<TStream extends ReadableStream, TIn, TOut>
    extends
        Readable<TIn, TOut>
    implements
        IStreamAdapter<TStream>, IDisposable {

    private _isDisposed: boolean;
    private _isClosed: boolean;
    private _baseStream: TStream;


    public get baseStream(): TStream {
        return this._baseStream;
    }


    public get isReadable(): boolean {
        return this.baseStream.readable;
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
        this._isClosed = false;
        this._baseStream = baseStream;

        this.baseStream.on('close', this.onClose);
        this.baseStream.on('end', this.onEnd);
    }


    public dispose(): void {
        if (!this.isDisposed) {
            this._isDisposed = true;

            this.baseStream.removeListener('close', this.onClose);
            this.baseStream.removeListener('end', this.onEnd);
        }
    }


    protected awaitClose(): Promise<void> {
        let deferred: DeferredObject = new DeferredObject();

        if (this.isClosed) {
            deferred.resolve();

            return deferred.promise;
        }

        let onClose = () => {
            deferred.resolve();
            removeListeners();
        };

        let onError = (error: NodeJS.ErrnoException) => {
            deferred.reject(error);
            removeListeners();
        };

        let removeListeners = () => {
            this.baseStream.removeListener('close', onClose);
            this.baseStream.removeListener('error', onError);
        };

        this.baseStream.on('close', onClose);
        this.baseStream.on('error', onError);

        return deferred.promise;
    }


    @Method.attached()
    protected onClose(): void {
        this._isClosed = true;
    }


    @Method.attached()
    protected onEnd(): void {
        this.setEnded(true);
    }


    protected abstract transform(input: TIn): Promise<TOut>;


    protected async _read(): Promise<TIn> {
        let deferred: DeferredObject<TIn> = new DeferredObject<TIn>();

        if (this.isEnded) {
            deferred.resolve(null);
        } else if (this.isClosed) {
            deferred.reject(new EndOfStreamException(`Unable to read from closed stream.`));
        } else {
            let input: TIn = this.baseStream.read();

            if (input != null) {
                deferred.resolve(input);
            } else {
                this.scheduleRead(deferred);
            }
        }

        return deferred.promise;
    }


    private scheduleRead(deferred: DeferredObject<TIn>): void {
        let onReadable = () => {
            let input: TIn = this.baseStream.read();

            deferred.resolve(input);

            removeListeners();
        };

        let onEnd = () => {
            deferred.resolve(null);

            removeListeners();
        };

        let onError = (error: NodeJS.ErrnoException) => {
            let ex: IOException = IOException.fromError(error);

            deferred.reject(ex);

            removeListeners();
        };

        let removeListeners = () => {
            this.baseStream.removeListener('end', onEnd);
            this.baseStream.removeListener('readable', onReadable);
            this.baseStream.removeListener('error', onError);
        };

        this.baseStream.once('end', onEnd);
        this.baseStream.once('readable', onReadable);
        this.baseStream.once('error', onError);
    }
}
