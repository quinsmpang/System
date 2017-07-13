import { Encoding } from './Encoding';
export declare class AsciiEncoding extends Encoding {
    static readonly instance: AsciiEncoding;
    readonly webName: string;
    readonly encodingName: string;
    readonly maxCharacterSize: number;
}
