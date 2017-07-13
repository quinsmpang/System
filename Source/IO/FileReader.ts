import {createReadStream, ReadStream} from 'fs';
import {ReadStreamAdapter} from './Adapters/ReadStreamAdapter';
import {Assert} from '@typescript-standard-library/core/Source/Assertion/Assert';


export class FileReader extends ReadStreamAdapter<ReadStream, Buffer, Buffer> {
    public get fileName(): string {
        return this.baseStream.path.toString();
    }


    public get bytesRead(): number {
        return this.baseStream.bytesRead;
    }


    public constructor(fileName: string, start?: number, end?: number) {
        Assert.argument('fileName', fileName).notNull();

        super(createReadStream(fileName, {
            autoClose: false,
            start: start,
            end: end
        }));
    }


    public close(): Promise<void> {
        let promise: Promise<void> = this.awaitClose();

        this.baseStream.close();

        return promise;
    }


    protected async transform(chunk: Buffer): Promise<Buffer> {
        return chunk;
    }
}
