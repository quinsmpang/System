import {Assert} from '@typescript-standard-library/core/Source/Assertion/Assert';


export class LoaderConfiguration {
    private _rootDirectory: string;


    public get rootDirectory(): string {
        return this._rootDirectory;
    }


    public set rootDirectory(value: string) {
        this._rootDirectory = value;
    }


    public constructor(rootDirectory: string) {
        Assert.argument('rootDirectory', rootDirectory).notNull();

        this._rootDirectory = rootDirectory;
    }
}
