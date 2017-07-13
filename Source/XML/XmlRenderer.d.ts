import { XmlNode } from './DOM/XmlNode';
export declare class XmlRenderer {
    private childNodesRenderer;
    private nodeRendererList;
    private fallbackRenderer;
    render(node: XmlNode): string;
    private getNodeRenderer(node);
}
