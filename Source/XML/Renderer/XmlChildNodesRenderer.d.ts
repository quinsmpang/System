import { XmlNode } from '../DOM/XmlNode';
import { XmlRenderer } from '../XmlRenderer';
export declare class XmlChildNodesRenderer {
    private xmlRenderer;
    constructor(xmlRenderer: XmlRenderer);
    render(node: XmlNode): string;
}
