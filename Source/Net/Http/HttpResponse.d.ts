import { HeadersCollection } from './HeadersCollection';
import { HttpContent } from './HttpContent';
import { StatusCode } from './StatusCode';
export declare class HttpResponse {
    private _statusCode;
    private _statusMessage;
    private _headers;
    private _content;
    statusCode: StatusCode;
    statusMessage: string;
    readonly headers: HeadersCollection;
    content: HttpContent;
    readonly hasContent: boolean;
    readonly isSuccessStatusCode: boolean;
    constructor(statusCode?: StatusCode);
}
