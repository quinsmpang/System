import { LoggerBase } from './LoggerBase';
import { ILogRecord } from './ILogRecord';
import { Writable } from '../Stream/Writable';
export declare class LogWriter extends LoggerBase {
    private _target;
    target: Writable<string>;
    constructor(target: Writable<string>);
    protected doWrite(record: ILogRecord): Promise<void>;
}
