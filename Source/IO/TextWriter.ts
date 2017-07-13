import {createWriteStream, WriteStream} from 'fs';
import {WriteStreamAdapter} from './Adapters/WriteStreamAdapter';
import {Encoding} from '../Text/Encoding';
import {Utf8Encoding} from '../Text/Utf8Encoding';
import {Assert} from '@typescript-standard-library/core/Source/Assertion/Assert';


export class TextWriter extends WriteStreamAdapter<WriteStream, string, string> {
    public get fileName(): string {
        return this.baseStream.path.toString();
    }


    public get bytesWritten(): number {
        return this.baseStream.bytesWritten;
    }


    public constructor(fileName: string, encoding: Encoding = Utf8Encoding.instance) {
        Assert.argument('fileName', fileName).notNull();
        Assert.argument('encoding', encoding).notNull();

        super(createWriteStream(fileName));

        this.baseStream.setDefaultEncoding(encoding.encodingName);
    }


    protected async transform(chunk: string): Promise<string> {
        return chunk;
    }
}
