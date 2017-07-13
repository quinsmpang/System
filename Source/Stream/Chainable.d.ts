export declare abstract class Chainable<TIn, TOut> {
    private _receivers;
    addReceiver<T extends Chainable<TOut, any>>(receiver: T): void;
    removeReceiver<T extends Chainable<TOut, any>>(receiver: T): void;
    hasReceiver<T extends Chainable<TOut, any>>(receiver: T): boolean;
    removeAllReceivers(): void;
    protected push(input: TIn): Promise<void>;
    protected abstract transform(input: TIn): Promise<TOut>;
    protected emit(output: TOut): Promise<void>;
}
