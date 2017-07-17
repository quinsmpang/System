import {HttpServerConfiguration} from '../Net/Http/HttpServerConfiguration';
import {Assert} from '@typescript-standard-library/core/Source/Assertion/Assert';
import {HttpServer} from '../Net/Http/HttpServer';
import {NodeApplication} from './NodeApplication';


export abstract class HttpApplication extends NodeApplication {
    private _server: HttpServer;
    private _serverConfiguration: HttpServerConfiguration;


    public get server(): HttpServer {
        return this._server;
    }


    public get serverConfiguration(): HttpServerConfiguration {
        return this._serverConfiguration;
    }


    public constructor(serverConfiguration: HttpServerConfiguration) {
        super();

        Assert.argument('serverConfiguration', serverConfiguration).notNull();

        this._serverConfiguration = serverConfiguration;
        this._server = new HttpServer(serverConfiguration);
    }


    public stop(): Promise<void> {
        return this.server.stop();
    }
}
