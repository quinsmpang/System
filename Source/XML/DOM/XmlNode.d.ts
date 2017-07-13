import { XmlNodeList } from './XmlNodeList';
import { XmlNodeAttributes } from './XmlNodeAttributes';
import { ICloneable } from '@typescript-standard-library/core/Source/types';
import { Node } from '@typescript-standard-library/core/Source/Data/Structures/Tree/Node';
export declare class XmlNode extends Node implements ICloneable<XmlNode> {
    protected _parentNode: XmlNode;
    protected _childNodes: XmlNodeList;
    protected _attributes: XmlNodeAttributes;
    parentNode: XmlNode;
    readonly attributes: XmlNodeAttributes;
    readonly childNodes: XmlNodeList;
    clone(): XmlNode;
}
