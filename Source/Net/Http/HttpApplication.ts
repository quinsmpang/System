import {Application} from '@typescript-standard-library/core/Source/Application/Application';
import {HttpServerConfiguration} from './HttpServerConfiguration';
import {Assert} from '@typescript-standard-library/core/Source/Assertion/Assert';
import {HttpServer} from './HttpServer';


export abstract class HttpApplication extends Application {
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
}
