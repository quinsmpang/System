import { ProcessIOMode } from './ProcessIOMode';
import { StandardInputStream } from './StandardInputStream';
import { StandardOutputStream } from './StandardOutputStream';
import { StandardErrorStream } from './StandardErrorStream';
import { Pool } from '@typescript-standard-library/core/Source/types';
export declare class ProcessStartInfo {
    fileName: string;
    commandLineArguments: string[];
    environment: Pool<string>;
    isDetached: boolean;
    shellName: string;
    useShellExecute: boolean;
    workingDirectory: string;
    ownerUserId: number;
    ownerGroupId: number;
    standardInput: StandardInputStream | ProcessIOMode;
    standardOutput: StandardOutputStream | ProcessIOMode;
    standardError: StandardErrorStream | ProcessIOMode;
    constructor(fileName: string, ...commandLineArguments: string[]);
}
