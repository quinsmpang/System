import { XmlNode } from './XmlNode';
import { Dictionary } from '@typescript-standard-library/core/Source/Collections/Dictionary';
export declare class XmlNodeAttributes extends Dictionary<string, string> {
    private _node;
    readonly node: XmlNode;
    constructor(node: XmlNode);
    clone(): XmlNodeAttributes;
    toString(): string;
}
