import {createReadStream, ReadStream} from 'fs';
import {Encoding} from '../Text/Encoding';
import {Utf8Encoding} from '../Text/Utf8Encoding';
import {ReadStreamAdapter} from './Adapters/ReadStreamAdapter';
import {Assert} from '@typescript-standard-library/core/Source/Assertion/Assert';


export class TextReader extends ReadStreamAdapter<ReadStream, string, string> {

    public get fileName(): string {
        return this.baseStream.path.toString();
    }


    public get bytesRead(): number {
        return this.baseStream.bytesRead;
    }


    public constructor(fileName: string, encoding: Encoding = Utf8Encoding.instance) {
        Assert.argument('fileName', fileName).notNull();
        Assert.argument('encoding', encoding).notNull();

        super(createReadStream(fileName));

        this.baseStream.setEncoding(encoding.encodingName);
    }


    public close(): Promise<void> {
        let promise: Promise<void> = this.awaitClose();

        this.baseStream.close();

        return promise;
    }


    protected async transform(input: string): Promise<string> {
        return input;
    }
}
