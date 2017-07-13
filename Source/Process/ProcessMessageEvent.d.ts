import { ProcessEvent } from './ProcessEvent';
import { Process } from './Process';
import { ProcessMessage } from './ProcessMessage';
export declare class ProcessMessageEvent extends ProcessEvent {
    private _message;
    readonly message: ProcessMessage;
    constructor(process: Process, message: ProcessMessage);
}
