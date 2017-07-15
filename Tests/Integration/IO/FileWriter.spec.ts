import {FileWriter} from '../../../Source/IO/FileWriter';
import {FileSystem} from '../../../Source/IO/FileSystem';


describe(`FileWriter`, () => {
    test(`creating of new file writer`, async () => {
        let textFileName: string = __dirname + '/_Samples/TextFileOutput.txt';

        if (await FileSystem.fileExists(textFileName)) {
            await FileSystem.removeFile(textFileName);
        }

        await expect(FileSystem.fileExists(textFileName)).resolves.toBe(false);

        let reader: FileWriter = new FileWriter(textFileName);

        expect(reader.bytesWritten).toBe(0);
        expect(reader.fileName).toBe(textFileName);
        expect(reader.isWritable).toBe(true);
        expect(reader.isFinished).toBe(false);
        expect(reader.isClosed).toBe(false);
        expect(reader.isDisposed).toBe(false);

        await reader.close();

        await expect(FileSystem.fileExists(textFileName)).resolves.toBe(true);

        if (await FileSystem.fileExists(textFileName)) {
            await FileSystem.removeFile(textFileName);
        }

        await expect(FileSystem.fileExists(textFileName)).resolves.toBe(false);
    });
});
