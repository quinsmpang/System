import {IncomingMessage} from 'http';
import {HttpMethod} from './HttpMethod';
import {Uri} from '../../Uri/Uri';
import {Encoding} from '../../Text/Encoding';
import {HttpRequest} from './HttpRequest';
import {ReadStreamAdapter} from '../../IO/Adapters/ReadStreamAdapter';
import {TextTransform} from '@typescript-standard-library/core/Source/Text/TextTransform';


export class HttpRequestReader extends ReadStreamAdapter<IncomingMessage, Buffer, Buffer> {
    private _request: HttpRequest;


    public get request(): HttpRequest {
        return this._request;
    }


    public constructor(stream: IncomingMessage) {
        super(stream);

        this._request = new HttpRequest(
            this.extractRequestUrl(),
            this.extractRequestMethod()
        );

        this.extractRequestHeaders();
    }


    public setEncoding(encoding: Encoding): void {
        this.baseStream.setEncoding(encoding.encodingName);
    }


    public close(): Promise<void> {
        let promise: Promise<void> = this.awaitClose();

        this.baseStream.destroy();

        return promise;
    }


    protected async transform(input: Buffer): Promise<Buffer> {
        return input;
    }


    private extractRequestMethod(): HttpMethod {
        let enumKey: string = TextTransform.toCapitalCase(this.baseStream.method);
        let requestMethod: HttpMethod = HttpMethod[enumKey];

        if (requestMethod == null) {
            return HttpMethod.Get;
        }

        return requestMethod;
    }


    private extractRequestUrl(): Uri {
        return new Uri(this.baseStream.url);
    }


    private extractRequestHeaders(): void {
        Object.keys(this.baseStream.headers).forEach((headerName: string) => {
            let headerValues: string | string[] = this.baseStream.headers[headerName];

            if (!headerValues) {
                return;
            }

            if (typeof headerValues === 'string') {
                this._request.headers.set(headerName, headerValues);
            } else {
                headerValues.forEach((headerValue: string): void => {
                    this._request.headers.set(headerName, headerValue);
                });
            }
        });
    }
}
