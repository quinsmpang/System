import {createWriteStream, WriteStream} from 'fs';
import {WriteStreamAdapter} from './Adapters/WriteStreamAdapter';
import {Assert} from '@typescript-standard-library/core/Source/Assertion/Assert';


export class FileWriter extends WriteStreamAdapter<WriteStream, Buffer, Buffer> {

    public get fileName(): string {
        return this.baseStream.path.toString();
    }


    public get bytesWritten(): number {
        return this.baseStream.bytesWritten;
    }


    public constructor(fileName: string) {
        Assert.argument('fileName', fileName).notNull();

        super(createWriteStream(fileName));
    }


    protected async transform(chunk: Buffer): Promise<Buffer> {
        return chunk;
    }
}
