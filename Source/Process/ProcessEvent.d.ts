import { Process } from './Process';
import { Event } from '@typescript-standard-library/core/Source/Events/Event';
export declare type ProcessEventType = 'start' | 'exit' | 'close' | 'disconnect' | 'terminate' | 'message';
export declare class ProcessEvent extends Event {
    static readonly EXIT: ProcessEventType;
    static readonly CLOSE: ProcessEventType;
    static readonly TERMINATE: ProcessEventType;
    static readonly DISCONNECT: ProcessEventType;
    static readonly START: ProcessEventType;
    static readonly MESSAGE: ProcessEventType;
    private _process;
    readonly process: Process;
    constructor(eventType: ProcessEventType, process: Process);
}
