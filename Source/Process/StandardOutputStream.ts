import {Readable} from 'stream';
import {ReadStreamAdapter} from '../IO/Adapters/ReadStreamAdapter';


export class StandardOutputStream extends ReadStreamAdapter<Readable, Buffer, Buffer> {

    protected async transform(input: Buffer): Promise<Buffer> {
        return input;
    }
}
