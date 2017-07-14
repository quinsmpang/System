import * as fs from 'fs';
import {AccessPermissions} from '../../../Source/IO/AccessPermissions';
import {Fixture} from '@typescript-standard-library/testing/Source/Fixture';
import {DeferredObject} from '@typescript-standard-library/core/Source/Async/DeferredObject';


export class DirectoryFixture extends Fixture {
    private _path: string;
    private _accessPermissions: AccessPermissions;


    public get path(): string {
        return this._path;
    }


    public constructor(
        fullPath: string,
        accessPermissions: AccessPermissions = AccessPermissions.All
    ) {
        super();

        this._path = fullPath;
        this._accessPermissions = accessPermissions;
    }


    protected doCreate(): Promise<void> {
        let deferred: DeferredObject = new DeferredObject();

        fs.mkdir(this._path, this._accessPermissions, (error: NodeJS.ErrnoException) => {
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

        fs.rmdir(this._path, (error: NodeJS.ErrnoException) => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }
}
