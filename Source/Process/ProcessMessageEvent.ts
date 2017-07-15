import {ProcessEvent} from './ProcessEvent';
import {Process} from './Process';
import {ProcessMessage} from './ProcessMessage';


export class ProcessMessageEvent extends ProcessEvent {
    private _message: ProcessMessage;


    public get message(): ProcessMessage {
        return this._message;
    }


    public constructor(process: Process, message: ProcessMessage) {
        super(ProcessMessageEvent.MESSAGE, process);

        this._message = message;
    }
}
