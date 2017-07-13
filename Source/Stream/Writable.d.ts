import { Chainable } from './Chainable';
export declare abstract class Writable<TIn, TOut = TIn> extends Chainable<TIn, TOut> {
    write(input: TIn): Promise<void>;
    abstract close(): Promise<void>;
    emit(output: TOut): Promise<void>;
    protected abstract _write(output: TOut): Promise<void>;
}
