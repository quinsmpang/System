import { ILogger } from './ILogger';
import { ILogRecord } from './ILogRecord';
export declare abstract class LoggerBase implements ILogger {
    private _lineSeparator;
    lineSeparator: string;
    write(record: ILogRecord): Promise<void>;
    writeLine(message: string): Promise<void>;
    writeFormat(format: string, ...values: any[]): Promise<void>;
    protected abstract doWrite(record: ILogRecord): Promise<void>;
}
