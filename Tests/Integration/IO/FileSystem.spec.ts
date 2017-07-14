import {FileSystem} from '../../../Source/IO/FileSystem';
import {Utf8Encoding} from '../../../Source/Text/Utf8Encoding';
import {FileMode} from '../../../Source/IO/FileMode';
import {AccessPermissions} from '../../../Source/IO/AccessPermissions';
import {FileDescriptor} from '../../../Source/IO/types';
import {FileSystemEntry} from '../../../Source/IO/FileSystemEntry';
import {FileSystemFixtureCollection} from '../../Fixtures/node-fs/FileSystemFixtureCollection';
import {ArgumentNullException} from '@typescript-standard-library/core/Source/Exceptions/ArgumentNullException';
import {DateTime} from '@typescript-standard-library/core/Source/Time/DateTime';


describe.skip(`FileSystem`, () => {
    let fixtures: FileSystemFixtureCollection = new FileSystemFixtureCollection('/playground');


    beforeEach(async () => {
        await fixtures.createAll();
    });

    afterEach(async () => {
        await fixtures.destroyAll();
    });


    describe(`#open()`, () => {
        it(`throws if 'fullName' argument is not defined`, async () => {
            await expect(FileSystem.open(undefined))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'fullName' argument is null`, async () => {
            await expect(FileSystem.open(null))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'fileMode' argument is null`, async () => {
            await expect(FileSystem.open(fixtures.singleLineTextFile.fileName, null))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'accessPermissions' argument is null`, async () => {
            await expect(FileSystem.open(fixtures.singleLineTextFile.fileName, FileMode.Read, null))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`returns file descriptor represented as positive integer`, async () => {
            let fileDescriptor: FileDescriptor = await FileSystem.open(fixtures.singleLineTextFile.fileName);

            expect(typeof fileDescriptor).toBe('number');
            expect(fileDescriptor).toBeGreaterThan(0);

            await FileSystem.close(fileDescriptor);
        });
    });


    describe(`#read()`, () => {
        it(`throws if 'fileDescriptor' argument is not defined`, async () => {
            await expect(FileSystem.read(undefined, 0, 1))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'fileDescriptor' argument is null`, async () => {
            await expect(FileSystem.read(null, 0, 1))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'position' argument is not defined`, async () => {
            await expect(FileSystem.read(1, undefined, 1))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'position' argument is null`, async () => {
            await expect(FileSystem.read(1, null, 1))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'length' argument is not defined`, async () => {
            await expect(FileSystem.read(1, 0, undefined))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'length' argument is null`, async () => {
            await expect(FileSystem.read(1, 0, null))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`returns specified amount of bytes read from file`, async () => {
            let fileDescriptor: FileDescriptor = await FileSystem.open(fixtures.singleLineTextFile.fileName);
            let bytes: Buffer = await FileSystem.read(fileDescriptor, 0, 3);

            expect(bytes).toBeInstanceOf(Buffer);
            expect(bytes.length).toBe(3);
            expect(Utf8Encoding.instance.getString(bytes)).toBe('123');

            await FileSystem.close(fileDescriptor);
        });
    });


    describe(`#write()`, () => {
        it(`throws if 'fileDescriptor' argument is not defined`, async () => {
            await expect(FileSystem.write(undefined, 0, Utf8Encoding.instance.getBytes('abc')))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'fileDescriptor' argument is null`, async () => {
            await expect(FileSystem.write(null, 0, Utf8Encoding.instance.getBytes('abc')))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'position' argument is not defined`, async () => {
            await expect(FileSystem.write(1, undefined, Utf8Encoding.instance.getBytes('abc')))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'position' argument is null`, async () => {
            await expect(FileSystem.write(1, null, Utf8Encoding.instance.getBytes('abc')))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'buffer' argument is not defined`, async () => {
            await expect(FileSystem.write(1, 0, undefined))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'buffer' argument is null`, async () => {
            await expect(FileSystem.write(1, 0, null))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`writes given bytes to file`, async () => {
            let fileName: string = fixtures.singleLineTextFile.fileName;
            let bytes: Buffer = Utf8Encoding.instance.getBytes('abc');
            let fileDescriptor: FileDescriptor = await FileSystem.open(fileName);
            let bytesWritten: number = await FileSystem.write(fileDescriptor, 0, bytes);

            expect(bytesWritten).toBe(bytes.length);

            let fileContents: Buffer = await FileSystem.read(fileDescriptor, 0, 10);

            expect(fileContents).toBeInstanceOf(Buffer);
            expect(Utf8Encoding.instance.getString(fileContents)).toBe('abc4567890');

            await FileSystem.close(fileDescriptor);
        });

        it(`writes given bytes to file at specified position`, async () => {
            let fileName: string = fixtures.singleLineTextFile.fileName;
            let bytes: Buffer = Utf8Encoding.instance.getBytes('abc');
            let fileDescriptor: FileDescriptor = await FileSystem.open(fileName);
            let bytesWritten: number = await FileSystem.write(fileDescriptor, 3, bytes);

            expect(bytesWritten).toBe(bytes.length);

            let fileContents: Buffer = await FileSystem.read(fileDescriptor, 0, 10);

            expect(fileContents).toBeInstanceOf(Buffer);
            expect(Utf8Encoding.instance.getString(fileContents)).toBe('123abc7890');

            await FileSystem.close(fileDescriptor);
        });
    });


    describe(`#close()`, () => {
        it(`throws if 'fileDescriptor' argument is not defined`, async () => {
            await expect(FileSystem.close(undefined))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'fileDescriptor' argument is null`, async () => {
            await expect(FileSystem.close(null))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`closes opened file by descriptor`, async () => {
            let fileDescriptor: FileDescriptor = await FileSystem.open(fixtures.singleLineTextFile.fileName);

            await FileSystem.close(fileDescriptor);
        });
    });


    describe(`#getStats()`, () => {
        it(`throws if 'fullName' argument is not defined`, async () => {
            await expect(FileSystem.getEntry(undefined))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'fullName' argument is null`, async () => {
            await expect(FileSystem.getEntry(null))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`creates file with specified access permissions`, async () => {
            let entry: FileSystemEntry = await FileSystem.getEntry(fixtures.singleLineTextFile.fileName);

            expect(entry).toBeInstanceOf(File);
            expect(entry.creationTime).toBeInstanceOf(DateTime);
            expect(entry.lastAccessTime).toBeInstanceOf(DateTime);
            expect(entry.lastChangeTime).toBeInstanceOf(DateTime);
            expect(entry.lastWriteTime).toBeInstanceOf(DateTime);
            expect(entry.length).toBeGreaterThan(0);
            expect(typeof entry.inode).toBe('number');
            expect(typeof entry.accessPermissions).toBe('number');
            expect(typeof entry.deviceId).toBe('number');
            expect(typeof entry.specialDeviceId).toBe('number');
        });
    });


    describe(`#getPermissions()`, () => {
        it(`throws if 'fullName' argument is not defined`, async () => {
            await expect(FileSystem.getPermissions(undefined))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'fullName' argument is null`, async () => {
            await expect(FileSystem.getPermissions(null))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`returns access permissions of file / directory`, async () => {
            let permissions: AccessPermissions = await FileSystem.getPermissions(fixtures.singleLineTextFile.fileName);

            expect(typeof permissions).toBe('number');
        });
    });


    describe(`#setPermissions()`, () => {
        it(`throws if 'fullName' argument is not defined`, async () => {
            await expect(FileSystem.setPermissions(undefined, AccessPermissions.Default))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'fullName' argument is null`, async () => {
            await expect(FileSystem.setPermissions(null, AccessPermissions.Default))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'accessPermissions' argument is null`, async () => {
            await expect(FileSystem.setPermissions(fixtures.singleLineTextFile.fileName, null))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`changes access permissions of file / directory`, async () => {
            await FileSystem.setPermissions(fixtures.singleLineTextFile.fileName, AccessPermissions.Default);

            let permissions: AccessPermissions = await FileSystem.getPermissions(fixtures.singleLineTextFile.fileName);

            expect(permissions).toBe(AccessPermissions.Default);
        });
    });


    describe(`#readFile()`, () => {
        it(`throws if 'fileName' argument is not defined`, async () => {
            await expect(FileSystem.readFile(undefined))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'fileName' argument is null`, async () => {
            await expect(FileSystem.readFile(null))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`returns contents of the file as bytes`, async () => {
            let fileName: string = fixtures.singleLineTextFile.fileName;
            let fileContents: Buffer = await FileSystem.readFile(fileName);

            expect(fileContents).toBeInstanceOf(Buffer);
            expect(fileContents.length).toBe(10);
            expect(Utf8Encoding.instance.getString(fileContents)).toBe('1234567890');
        });
    });


    describe(`#writeFile()`, () => {
        it(`throws if 'fileName' argument is not defined`, async () => {
            let fileContents: Buffer = Utf8Encoding.instance.getBytes('abc');

            await expect(FileSystem.writeFile(undefined, fileContents))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'fileName' argument is null`, async () => {
            let fileContents: Buffer = Utf8Encoding.instance.getBytes('abc');

            await expect(FileSystem.writeFile(null, fileContents))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'fileContent' argument is not defined`, async () => {
            let fileName: string = fixtures.singleLineTextFile.fileName;
            let fileContent: Buffer;

            await expect(FileSystem.writeFile(fileName, fileContent))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'fileContent' argument is null`, async () => {
            let fileName: string = fixtures.singleLineTextFile.fileName;
            let fileContent: Buffer = null;

            await expect(FileSystem.writeFile(fileName, fileContent))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`writes content to the file`, async () => {
            let fileName: string = fixtures.singleLineTextFile.fileName;
            let fileContents: Buffer = Utf8Encoding.instance.getBytes('qwerty');

            await FileSystem.writeFile(fileName, fileContents);

            let actualContent: Buffer = await FileSystem.readFile(fileName);

            expect(actualContent).toBeInstanceOf(Buffer);
            expect(actualContent.length).toBe(6);
            expect(Utf8Encoding.instance.getString(actualContent)).toBe('qwerty');
        });
    });


    describe(`#removeFile()`, () => {
        it(`throws if 'fileName' argument is not defined`, async () => {
            await expect(FileSystem.removeFile(undefined))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`throws if 'fileName' argument is null`, async () => {
            await expect(FileSystem.removeFile(null))
                .rejects.toThrowError(ArgumentNullException);
        });

        it(`removes file with given name`, async () => {
            let fileName: string = fixtures.singleLineTextFile.fileName;

            expect(await FileSystem.fileExists(fileName)).toBe(true);

            await FileSystem.removeFile(fileName);

            expect(await FileSystem.fileExists(fileName)).toBe(false);
        });
    });
});
