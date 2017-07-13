import { ProcessIOMode } from './types';
import { StandardInputStream } from './StandardInputStream';
import { StandardOutputStream } from './StandardOutputStream';
import { StandardErrorStream } from './StandardErrorStream';
import { Dictionary } from '@typescript-standard-library/core/Source/Collections/Dictionary';
export declare class ProcessStartInfo {
    fileName: string;
    commandLineArguments: string[];
    environment: Dictionary<string, string>;
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
