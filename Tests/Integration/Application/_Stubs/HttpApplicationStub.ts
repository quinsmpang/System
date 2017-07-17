import {HttpApplication} from '../../../../Source/Application/HttpApplication';
import {HttpServerConfigurationStub} from './HttpServerConfigurationStub';


export class HttpApplicationStub extends HttpApplication {
    public constructor() {
        super(new HttpServerConfigurationStub());
    }


    public main(): Promise<void> {
        return this.server.listen();
    }
}
