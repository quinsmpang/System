import * as fs from 'fs';
import {AccessPermissions} from '../../../Source/IO/AccessPermissions';
import {callAsyncMethod} from '@typescript-standard-library/core/Source/Async/Utils';
import {Fixture} from '@typescript-standard-library/testing/Source/Fixture';


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
        return callAsyncMethod<void>(fs, 'mkdir', this._path, this._accessPermissions);
    }


    protected doDestroy(): Promise<void> {
        return callAsyncMethod<void>(fs, 'rmdir', this._path);
    }
}
