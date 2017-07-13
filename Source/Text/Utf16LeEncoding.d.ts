import { Encoding } from './Encoding';
export declare class Utf16LeEncoding extends Encoding {
    static readonly instance: Utf16LeEncoding;
    readonly webName: string;
    readonly encodingName: string;
    readonly maxCharacterSize: number;
}
