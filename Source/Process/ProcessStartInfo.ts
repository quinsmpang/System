import {ProcessIOMode} from './ProcessIOMode';
import {StandardInputStream} from './StandardInputStream';
import {StandardOutputStream} from './StandardOutputStream';
import {StandardErrorStream} from './StandardErrorStream';
import {Assert} from '@typescript-standard-library/core/Source/Assertion/Assert';
import {Pool} from '@typescript-standard-library/core/Source/types';


export class ProcessStartInfo {
    public fileName: string;
    public commandLineArguments: string[];
    public environment: Pool<string> = process.env;
    public isDetached: boolean = false;
    public shellName: string = '';
    public useShellExecute: boolean = false;
    public workingDirectory: string = process.cwd();
    public ownerUserId: number;
    public ownerGroupId: number;
    public standardInput: StandardInputStream | ProcessIOMode = ProcessIOMode.Pipe;
    public standardOutput: StandardOutputStream | ProcessIOMode = ProcessIOMode.Pipe;
    public standardError: StandardErrorStream | ProcessIOMode = ProcessIOMode.Pipe;


    public constructor(fileName: string, ...commandLineArguments: string[]) {
        Assert.argument('fileName', fileName).notNull();

        this.fileName = fileName;
        this.commandLineArguments = commandLineArguments;
    }
}
