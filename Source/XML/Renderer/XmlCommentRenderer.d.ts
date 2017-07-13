import { IXmlNodeRenderer } from './IXmlNodeRenderer';
import { XmlNode } from '../DOM/XmlNode';
export declare class XmlCommentRenderer implements IXmlNodeRenderer {
    match(node: XmlNode): boolean;
    render(node: XmlNode): string;
}
