import { Encoding } from './Encoding';
export declare class Base64Encoding extends Encoding {
    static readonly instance: Base64Encoding;
    readonly webName: string;
    readonly encodingName: string;
    readonly maxCharacterSize: number;
}
