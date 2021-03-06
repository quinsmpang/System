import { QueryParamsCollection } from './QueryParamsCollection';
import { ICloneable, IEquatable, IJSONSerializable } from '@typescript-standard-library/core/Source/types';
export declare const URI_PATH_SEGMENTS_DELIMITER: string;
export declare const URI_PATTERN: RegExp;
export declare const URI_AUTHORITY_PATTERN: RegExp;
export declare class Uri implements ICloneable<Uri>, IJSONSerializable<string>, IEquatable<Uri> {
    static parse(uri: string): Uri;
    static validate(uri: string): boolean;
    static encode(uri: string): string;
    static decode(uri: string): string;
    static encodeComponent(uriComponent: string): string;
    static decodeComponent(uriComponent: string): string;
    protected _originalUri: string;
    protected _scheme: string;
    protected _authority: string;
    protected _userName: string;
    protected _password: string;
    protected _host: string;
    protected _port: number;
    protected _path: string;
    protected _query: QueryParamsCollection;
    protected _fragment: string;
    readonly originalUri: string;
    readonly scheme: string;
    readonly authority: string;
    readonly userName: string;
    readonly password: string;
    readonly host: string;
    readonly port: number;
    readonly path: string;
    readonly query: QueryParamsCollection;
    readonly fragment: string;
    readonly isAbsolute: boolean;
    readonly isDefaultPort: boolean;
    constructor(uri?: string);
    equals(other: Uri): boolean;
    toString(): string;
    toJSON(): string;
    clone(): Uri;
    protected getBaseComponents(uri: string): string[];
    protected getAuthorityComponents(authority: string): string[];
    protected normalizePath(path: string): string;
    protected normalizePortNumber(port: string): number;
}
