import {HttpServerConfiguration} from '../../../../Source/Net/Http/HttpServerConfiguration';
import {HttpRequest} from '../../../../Source/Net/Http/HttpRequest';
import {HttpResponse} from '../../../../Source/Net/Http/HttpResponse';
import {StatusCode} from '../../../../Source/Net/Http/StatusCode';
import {HttpRoutingDispatcher} from '../../../../Source/Net/Http/Routing/HttpRoutingDispatcher';
import {HttpRoutesRegistry} from '../../../../Source/Net/Http/Routing/HttpRoutesRegistry';


export class HttpServerConfigurationStub extends HttpServerConfiguration {

    public constructor() {
        super('localhost', 3000);

        this.requestHandler = new HttpRoutingDispatcher(HttpRoutesRegistry.routes, {
            send: async (request: HttpRequest): Promise<HttpResponse> => {
                return new HttpResponse(StatusCode.NotFound);
            }
        });
    }
}
