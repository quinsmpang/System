import { IXmlNodeRenderer } from './IXmlNodeRenderer';
import { XmlNode } from '../DOM/XmlNode';
export declare class XmlCharacterDataRenderer implements IXmlNodeRenderer {
    match(node: XmlNode): boolean;
    render(node: XmlNode): string;
}
