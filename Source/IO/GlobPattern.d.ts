import { PathPattern } from './PathPattern';
export declare class GlobPattern extends PathPattern {
    static toRegularExpression(glob: string, ignoreCase?: boolean): RegExp;
    constructor(glob: string, ignoreCase?: boolean);
}
