import { IHttpErrorHandler } from './IHttpErrorHandler';
import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';
export declare class HttpErrorHandler implements IHttpErrorHandler {
    send(request: HttpRequest, error: Error): Promise<HttpResponse>;
}
