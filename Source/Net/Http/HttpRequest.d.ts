import { Uri } from '../../Uri/Uri';
import { HttpMethod } from './HttpMethod';
import { HeadersCollection } from './HeadersCollection';
import { AcceptTypesCollection } from './AcceptTypesCollection';
export declare class HttpRequest {
    private _httpMethod;
    private _url;
    private _headers;
    readonly httpMethod: HttpMethod;
    readonly url: Uri;
    readonly headers: HeadersCollection;
    readonly acceptTypes: AcceptTypesCollection;
    readonly userAgent: string;
    constructor(url: Uri, method?: HttpMethod);
}
