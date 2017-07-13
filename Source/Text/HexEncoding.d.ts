import { Encoding } from './Encoding';
export declare class HexEncoding extends Encoding {
    static readonly instance: HexEncoding;
    readonly webName: string;
    readonly encodingName: string;
    readonly maxCharacterSize: number;
}
