import { XmlNode } from './XmlNode';
import { NodeCollection } from '@typescript-standard-library/core/Source/Data/Structures/Tree/NodeCollection';
export declare class XmlNodeList extends NodeCollection<XmlNode> {
    clone(): XmlNodeList;
}
