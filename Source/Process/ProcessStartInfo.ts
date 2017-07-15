import {ProcessIOMode} from './types';
import {StandardInputStream} from './StandardInputStream';
import {StandardOutputStream} from './StandardOutputStream';
import {StandardErrorStream} from './StandardErrorStream';
import {Dictionary} from '@typescript-standard-library/core/Source/Collections/Dictionary';
import {Assert} from '@typescript-standard-library/core/Source/Assertion/Assert';


export class ProcessStartInfo {
    public fileName: string;
    public commandLineArguments: string[];
    public environment: Dictionary<string, string> = new Dictionary();
    public isDetached: boolean = false;
    public shellName: string = '';
    public useShellExecute: boolean = false;
    public workingDirectory: string = process.cwd();
    public ownerUserId: number;
    public ownerGroupId: number;
    public standardInput: StandardInputStream | ProcessIOMode = ProcessIOMode.Inherit;
    public standardOutput: StandardOutputStream | ProcessIOMode = ProcessIOMode.Inherit;
    public standardError: StandardErrorStream | ProcessIOMode = ProcessIOMode.Inherit;


    public constructor(fileName: string, ...commandLineArguments: string[]) {
        Assert.argument('fileName', fileName).notNull();

        this.fileName = fileName;
        this.commandLineArguments = commandLineArguments;
    }
}
