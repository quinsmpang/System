import { AcceptTypesCollection } from './AcceptTypesCollection';
export declare class AcceptTypesParser {
    static readonly instance: AcceptTypesParser;
    parse(value: string): AcceptTypesCollection;
    private getValueSegments(value);
    private hasPriorityMarker(segment);
    private getPriority(segment);
}
