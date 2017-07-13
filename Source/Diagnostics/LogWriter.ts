import {LoggerBase} from './LoggerBase';
import {ILogRecord} from './ILogRecord';
import {Writable} from '../Stream/Writable';
import {Assert} from '@typescript-standard-library/core/Source/Assertion/Assert';


export class LogWriter extends LoggerBase {
    private _target: Writable<string>;


    public get target(): Writable<string> {
        return this._target;
    }


    public set target(value: Writable<string>) {
        Assert.argument('value', value).notNull();

        this._target = value;
    }


    public constructor(target: Writable<string>) {
        Assert.argument('target', target).notNull();

        super();

        this.target = target;
    }


    protected async doWrite(record: ILogRecord): Promise<void> {
        await this._target.write(record.toString());
    }
}
