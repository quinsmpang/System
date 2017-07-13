import { Encoding } from './Encoding';
export declare class Latin1Encoding extends Encoding {
    static readonly instance: Latin1Encoding;
    readonly webName: string;
    readonly encodingName: string;
    readonly maxCharacterSize: number;
}
