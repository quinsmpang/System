import { IXmlNodeRenderer } from './IXmlNodeRenderer';
import { XmlNode } from '../DOM/XmlNode';
import { XmlChildNodesRenderer } from './XmlChildNodesRenderer';
export declare class XmlNodeRenderer implements IXmlNodeRenderer {
    private childNodesRenderer;
    constructor(childNodesRenderer: XmlChildNodesRenderer);
    match(node: XmlNode): boolean;
    render(node: XmlNode): string;
}
