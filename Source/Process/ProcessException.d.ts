import { Process } from './Process';
import { Exception } from '@typescript-standard-library/core/Source/Exceptions/Exception';
export declare class ProcessException extends Exception {
    readonly process: Process;
    constructor(message: string, process: Process);
}
