import { ArgumentsParserState } from './ArgumentsParserState';
import { Arguments } from './Arguments';
import { TextParser } from '@typescript-standard-library/core/Source/Text/Parsing/TextParser';
export declare class ArgumentsParser extends TextParser<ArgumentsParserState, Arguments> {
    static parse(args: string): Arguments;
    private _args;
    private _segments;
    readonly value: Arguments;
    parse(command: string): void;
    protected getInitialState(): ArgumentsParserState;
    protected reduce(currentChar: string): void;
    private resetSegments();
    private updateState(currentChar);
    private beginQuotedSegment(quotSign);
    private endQuotedSegment();
    private flushSegment();
    private createArguments();
    private resetArguments();
    private isLogicalOption(currentSegment, nextSegment);
    private isLeadingQuot(currentChar);
    private isTrailingQuot(currentChar);
    private isSegmentDelimiter(currentChar);
    private isOptionName(segment);
}
