import { ProcessException } from './ProcessException';
import { Process } from './Process';
export declare class NoAssociatedProcessException extends ProcessException {
    readonly helpInfo: string;
    constructor(process: Process);
}
