import {parse, isAbsolute, relative, resolve, join, ParsedPath} from 'path';
import {ICloneable, IJSONSerializable} from '@typescript-standard-library/core/Source/types';
import {IEnumerable} from '@typescript-standard-library/core/Source/Collections/IEnumerable';
import {Assert} from '@typescript-standard-library/core/Source/Assertion/Assert';


const PATH_SEGMENTS_DELIMITER: RegExp = /[\\/]+/g;


export class Path implements ICloneable<Path>, IJSONSerializable<string> {
    public static isAbsolute(path: string): boolean {
        return isAbsolute(path);
    }


    public static relative(from: string, to: string): string {
        return relative(from, to);
    }


    public static resolve(segments: IEnumerable<string>): string {
        return resolve(...segments);
    }


    public static concat(segments: IEnumerable<string>): string {
        return join(...segments);
    }


    public static split(path: string): string[] {
        return path.split(PATH_SEGMENTS_DELIMITER);
    }


    private _parsedPath: ParsedPath;
    private _originalPath: string;


    public get originalPath(): string {
        return this._originalPath;
    }


    public get directoryName(): string {
        return this._parsedPath.dir;
    }


    public get baseName(): string {
        return this._parsedPath.base;
    }


    public get baseNameWithoutExtension(): string {
        return this._parsedPath.name;
    }


    public get extension(): string {
        return this._parsedPath.ext;
    }


    public get root(): string {
        return this._parsedPath.root;
    }


    public get isAbsolute(): boolean {
        return Path.isAbsolute(this._originalPath);
    }


    public constructor(path: string) {
        Assert.argument('path', path).notNull();

        this._originalPath = path;
        this._parsedPath = parse(path);
    }


    public clone(): Path {
        return new Path(this._originalPath);
    }


    public toString(): string {
        return this._originalPath;
    }


    public toJSON(): string {
        return this.toString();
    }
}
