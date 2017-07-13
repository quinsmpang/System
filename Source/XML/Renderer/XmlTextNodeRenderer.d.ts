import { IXmlNodeRenderer } from './IXmlNodeRenderer';
import { XmlTextNode } from '../DOM/XmlTextNode';
export declare class XmlTextNodeRenderer implements IXmlNodeRenderer {
    match(node: XmlTextNode): boolean;
    render(node: XmlTextNode): string;
}
