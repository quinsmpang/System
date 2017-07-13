import { Encoding } from './Encoding';
export declare class Ucs2Encoding extends Encoding {
    static readonly instance: Ucs2Encoding;
    readonly webName: string;
    readonly encodingName: string;
    readonly maxCharacterSize: number;
}
