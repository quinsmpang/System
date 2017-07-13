import {WriteStreamAdapter} from '../IO/Adapters/WriteStreamAdapter';
import {Writable} from 'stream';


export class StandardInputStream extends WriteStreamAdapter<Writable, Buffer, Buffer> {

    protected async transform(input: Buffer): Promise<Buffer> {
        return input;
    }
}
