import {XmlNode} from './XmlNode';
import {NodeCollection} from '@typescript-standard-library/core/Source/Data/Structures/Tree/NodeCollection';


export class XmlNodeList extends NodeCollection<XmlNode> {
    public clone(): XmlNodeList {
        let clonedCollection: XmlNodeList = new XmlNodeList(this.parentNode);

        for (let childNode of this) {
            clonedCollection.add(childNode);
        }

        return clonedCollection;
    }
}
