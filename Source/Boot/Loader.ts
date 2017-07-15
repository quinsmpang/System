import {LoaderConfiguration} from './LoaderConfiguration';
import {Assert} from '@typescript-standard-library/core/Source/Assertion/Assert';
import {FileSystemEntry} from '../IO/FileSystemEntry';
import {Method} from '@typescript-standard-library/core/Source/Language/Decorators/Method';
import {FileSystemWalker} from '../IO/FileSystemWalker';
import {FileSystemWalkerContext} from '../IO/FileSystemWalkerContext';

const JAVASCRIPT_FILE_EXTENSION = /\.js$/i;


export class Loader {
    private _configuration: LoaderConfiguration;


    public get configuration(): LoaderConfiguration {
        return this._configuration;
    }


    public constructor(configuration: LoaderConfiguration) {
        Assert.argument('configuration', configuration).notNull();

        this._configuration = configuration;
    }


    public load(): Promise<void> {
        let fsWalker: FileSystemWalker = this.createFileSystemWalker();

        return fsWalker.walk(this.configuration.rootDirectory, this.processFileSystemEntry);
    }


    protected createFileSystemWalker(): FileSystemWalker {
        let walker: FileSystemWalker = new FileSystemWalker();

        walker.addEntrySelector(this.canProcessFileSystemEntry);

        return walker;
    }


    @Method.attached()
    protected canProcessFileSystemEntry(entry: FileSystemEntry): boolean {
        return entry.isFile && JAVASCRIPT_FILE_EXTENSION.test(entry.extension);
    }


    @Method.attached()
    protected async processFileSystemEntry(entry: FileSystemEntry, context: FileSystemWalkerContext): Promise<void> {
        require(entry.path);
    }
}
