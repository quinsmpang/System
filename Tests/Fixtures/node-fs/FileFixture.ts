import * as fs from 'fs';
import {AccessPermissions} from '../../../Source/IO/AccessPermissions';
import {Fixture} from '@typescript-standard-library/testing/Source/Fixture';
import {DeferredObject} from '@typescript-standard-library/core/Source/Async/DeferredObject';


export class FileFixture extends Fixture {
    private _fileName: string;
    private _content: string | Buffer;
    private _accessPermissions: AccessPermissions;


    public get fileName(): string {
        return this._fileName;
    }


    public constructor(
        fileName: string,
        content: string | Buffer,
        accessPermissions: AccessPermissions = AccessPermissions.Default
    ) {
        super();

        this._fileName = fileName;
        this._content = content;
        this._accessPermissions = accessPermissions;
    }


    protected doCreate(): Promise<void> {
        let deferred: DeferredObject = new DeferredObject();

        fs.writeFile(this._fileName, this._content, (error: NodeJS.ErrnoException) => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    protected doDestroy(): Promise<void> {
        let deferred: DeferredObject = new DeferredObject();

        fs.unlink(this._fileName, (error: NodeJS.ErrnoException) => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }
}
