import { Encoding } from './Encoding';
export declare class Utf8Encoding extends Encoding {
    static readonly instance: Utf8Encoding;
    readonly webName: string;
    readonly encodingName: string;
    readonly maxCharacterSize: number;
}
