import {HttpApplicationStub} from './_Stubs/HttpApplicationStub';
import * as http from 'http';
import {Utf8Encoding} from '../../../Source/Text/Utf8Encoding';
import {HttpRoute} from '../../../Source/Net/Http/Routing/HttpRoute';
import {HttpRequest} from '../../../Source/Net/Http/HttpRequest';
import {HttpResponse} from '../../../Source/Net/Http/HttpResponse';
import {StatusCode} from '../../../Source/Net/Http/StatusCode';
import {JsonContent} from '../../../Source/Net/Http/Content/JsonContent';
import {HttpRoutesRegistry} from '../../../Source/Net/Http/Routing/HttpRoutesRegistry';
import {ClientRequest} from 'http';


test(`accepting requests`, async () => {
    let response: Object = {
        meta: {
            timeStamp: Date.now()
        }
    };

    let route: HttpRoute = new HttpRoute('/getTestJson', {
        send: async (request: HttpRequest): Promise<HttpResponse> => {
            let httpResponse: HttpResponse = new HttpResponse(StatusCode.Ok);

            httpResponse.content = new JsonContent(response);

            return httpResponse;
        }
    });

    HttpRoutesRegistry.add(route);

    let application: HttpApplicationStub = new HttpApplicationStub();

    await application.main();

    expect(application.server.isListening).toBe(true);


    let json: object = await (new Promise((resolve, reject) => {
        let req: ClientRequest = http.request('http://localhost:3000/getTestJson', (res) => {
            res.setEncoding(Utf8Encoding.instance.encodingName);

            res.on('readable', () => {
                let jsonContent: string = res.read();
                let content: object;

                try {
                    content = JSON.parse(jsonContent);
                } catch (ex) {
                    return reject(ex);
                }

                resolve(content);
            });
        });

        req.end();
    }));


    await application.stop();

    expect(application.server.isListening).toBe(false);

    expect(json).toEqual(response);

});
