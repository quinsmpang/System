export declare class PathPattern {
    protected _pattern: RegExp;
    constructor(pattern: RegExp);
    test(path: string): boolean;
}
