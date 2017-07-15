import {Writable} from '../../../../Source/Stream/Writable';


export class TextStorage extends Writable<string, string> {
    private _storage: string[];


    public constructor(storage: string[]) {
        super();
        this._storage = storage;
    }


    public async close(): Promise<void> {
        // Stub
    }


    protected async _write(output: string): Promise<void> {
        this._storage.push(output);
    }


    protected async transform(input: string): Promise<string> {
        return input;
    }
}
