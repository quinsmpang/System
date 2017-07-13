import { IStateReceiver } from './IStateReceiver';
export declare abstract class StateContainer<TState, TAction> {
    private _receivers;
    private _state;
    readonly state: TState;
    constructor();
    dispatch(action: TAction): void;
    addReceiver(receiver: IStateReceiver<TState>): void;
    removeReceiver(receiver: IStateReceiver<TState>): boolean;
    removeAllReceivers(): void;
    resetState(): void;
    reset(): void;
    protected abstract getInitialState(): TState;
    protected abstract processAction(action: TAction): void;
    private broadcastState();
}
