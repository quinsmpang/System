import { Event } from '@typescript-standard-library/core/Source/Events/Event';
export declare type StreamEventType = 'open' | 'close' | 'readable' | 'data' | 'end' | 'finish' | 'drain' | 'error' | 'pipe' | 'unpipe';
export declare class StreamEvent extends Event {
    static readonly OPEN: StreamEventType;
    static readonly CLOSE: StreamEventType;
    static readonly READABLE: StreamEventType;
    static readonly DATA: StreamEventType;
    static readonly END: StreamEventType;
    static readonly FINISH: StreamEventType;
    static readonly DRAIN: StreamEventType;
    static readonly ERROR: StreamEventType;
    static readonly PIPE: StreamEventType;
    static readonly UNPIPE: StreamEventType;
    chunk: any;
}
