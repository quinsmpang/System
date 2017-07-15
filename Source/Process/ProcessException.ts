import {Process} from './Process';
import {Exception} from '@typescript-standard-library/core/Source/Exceptions/Exception';


export class ProcessException extends Exception {
    public readonly process: Process;


    public constructor(message: string, process: Process) {
        super(message);

        this.process = process;
    }
}
