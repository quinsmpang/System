/// <reference types="node" />
export declare abstract class Encoding {
    static convert(originalString: string, originalEncoding: Encoding, targetEncoding: Encoding): string;
    readonly abstract encodingName: string;
    readonly abstract webName: string;
    readonly abstract maxCharacterSize: number;
    getStringSize(stringLength: number): number;
    getString(originalBuffer: Buffer, charOffset?: number, charCount?: number): string;
    getBytes(originalString: string, charOffset?: number, charCount?: number): Buffer;
    getBytesCount(originalString: string): number;
}
