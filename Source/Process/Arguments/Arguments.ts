import {OptionsCollection} from './OptionsCollection';
import {ArgumentsParser} from './ArgumentsParser';
import {Assert} from '@typescript-standard-library/core/Source/Assertion/Assert';
import {IEnumerable} from '@typescript-standard-library/core/Source/Collections/IEnumerable';
import {ReadOnlyCollection} from '@typescript-standard-library/core/Source/Collections/ReadOnlyCollection';


export class Arguments {

    public static fromSegments(segments: IEnumerable<string>): Arguments {
        Assert.argument('segments', segments).notNull();

        let args: string = this.joinSegments(segments);

        return ArgumentsParser.parse(args);
    }


    private static joinSegments(segments: IEnumerable<string>): string {
        let safeSegments: string[] = [];

        for (let segment of segments) {
            safeSegments.push(Arguments.escapeSegment(segment));
        }

        return safeSegments.join(' ');
    }


    private static escapeSegment(segment: string): string {
        if (Arguments.isUnsafeSegment(segment)) {
            return `"${segment}"`;
        }

        return segment;
    }


    private static isUnsafeSegment(segment: string): boolean {
        return /\s/.test(segment);
    }


    private _executablePath: string;
    private _mainModulePath: string;
    private _commands: ReadOnlyCollection<string>;
    private _options: OptionsCollection;


    public get executablePath(): string {
        return this._executablePath;
    }


    public get mainModulePath(): string {
        return this._mainModulePath;
    }


    public get commands(): ReadOnlyCollection<string> {
        return this._commands;
    }


    public get options(): OptionsCollection {
        return this._options;
    }


    public constructor(
        executablePath: string,
        mainModulePath: string,
        commands: ReadOnlyCollection<string> = new ReadOnlyCollection<string>(),
        options: OptionsCollection = new OptionsCollection()
    ) {
        Assert.argument('executablePath', executablePath).notNull();
        Assert.argument('mainModulePath', mainModulePath).notNull();
        Assert.argument('commands', commands).notNull();
        Assert.argument('options', options).notNull();

        this._commands = commands;
        this._options = options;
        this._executablePath = executablePath;
        this._mainModulePath = mainModulePath;
    }


    public toString(): string {
        let segments: string[] = [];

        if (this._executablePath) {
            segments.push(`${Arguments.escapeSegment(this._executablePath)}`);
        }

        if (this._mainModulePath) {
            segments.push(`${Arguments.escapeSegment(this._mainModulePath)}`);
        }

        for (let command of this._commands) {
            segments.push(`${command}`);
        }

        for (let option of this._options) {
            segments.push(`${option.toString()}`);
        }

        return segments.join(' ');
    }
}
