import { Chainable } from './Chainable';
export declare abstract class Readable<TIn, TOut = TIn> extends Chainable<TIn, TOut> {
    private _isPaused;
    private _isEnded;
    readonly isPaused: boolean;
    readonly isEnded: boolean;
    read(): Promise<TOut>;
    resume(): Promise<void>;
    pause(): Promise<void>;
    protected abstract _read(): Promise<TIn>;
    protected push(): Promise<void>;
    protected setEnded(value: boolean): void;
    protected setPaused(value: boolean): void;
}
