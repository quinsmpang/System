/// <reference types="node" />
import { HttpContent } from '../HttpContent';
import { Encoding } from '../../../Text/Encoding';
import { Writable } from '../../../Stream/Writable';
export declare class TextContent extends HttpContent {
    private _encoding;
    private _bytes;
    constructor(content: string, encoding?: Encoding);
    copyTo(writer: Writable<Buffer, any>): Promise<void>;
}
