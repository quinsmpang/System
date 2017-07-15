import {FileReader} from '../../../Source/IO/FileReader';
import {FileWriter} from '../../../Source/IO/FileWriter';
import {Process} from '../../../Source/Process/Process';
import {FileSystem} from '../../../Source/IO/FileSystem';


describe(`FileReader`, () => {

    test(`creating of new file reader`, async () => {
        let reader: FileReader = new FileReader(__dirname + '/_Samples/TextFile.txt');

        expect(reader.bytesRead).toBe(0);
        expect(reader.fileName).toBe(__dirname + '/_Samples/TextFile.txt');
        expect(reader.isReadable).toBe(true);
        expect(reader.isPaused).toBe(true);
        expect(reader.isEnded).toBe(false);
        expect(reader.isClosed).toBe(false);
        expect(reader.isDisposed).toBe(false);

        await reader.close();
    });


    test(`reading file contents by bytes chunks`, async () => {
        let reader: FileReader = new FileReader(__dirname + '/_Samples/TextFile.txt');

        let expectedText: string =
            '1. Text File\n' +
            '2. Text File\n' +
            '3. Text File\n';

        let readBytes: Buffer = await reader.read();

        expect(readBytes).toBeInstanceOf(Buffer);
        expect(readBytes.toString()).toBe(expectedText);

        expect(reader.bytesRead).toBe(expectedText.length);
        expect(reader.isReadable).toBe(true);
        expect(reader.isPaused).toBe(true);
        expect(reader.isEnded).toBe(false);
        expect(reader.isClosed).toBe(false);
        expect(reader.isDisposed).toBe(false);

        readBytes = await reader.read();

        expect(readBytes).toBeNull();

        expect(reader.bytesRead).toBe(expectedText.length);
        expect(reader.isReadable).toBe(false);
        expect(reader.isPaused).toBe(true);
        expect(reader.isEnded).toBe(true);
        expect(reader.isClosed).toBe(false);
        expect(reader.isDisposed).toBe(false);

        await reader.close();

        expect(reader.bytesRead).toBe(expectedText.length);
        expect(reader.isReadable).toBe(false);
        expect(reader.isPaused).toBe(true);
        expect(reader.isEnded).toBe(true);
        expect(reader.isClosed).toBe(true);
        expect(reader.isDisposed).toBe(false);

        reader.dispose();

        expect(reader.bytesRead).toBe(expectedText.length);
        expect(reader.isReadable).toBe(false);
        expect(reader.isPaused).toBe(true);
        expect(reader.isEnded).toBe(true);
        expect(reader.isClosed).toBe(true);
        expect(reader.isDisposed).toBe(true);
    });


    test(`file copying`, async () => {
        let originalImageName: string = __dirname + '/_Samples/Image.jpg';
        let copiedImageName: string = __dirname + '/_Samples/ImageCopy.jpg';

        if (await FileSystem.fileExists(copiedImageName)) {
            await FileSystem.removeFile(copiedImageName);
        }

        expect(await FileSystem.fileExists(copiedImageName)).toBe(false);

        let reader: FileReader = new FileReader(originalImageName);
        let writer: FileWriter = new FileWriter(copiedImageName);

        reader.addReceiver(writer);

        await reader.resume();
        await reader.close();
        await writer.close();

        expect(await FileSystem.fileExists(copiedImageName)).toBe(true);

        let process: Process = await Process.run('cmp', originalImageName, copiedImageName);

        expect(process.exitCode).toBe(0);

        if (await FileSystem.fileExists(copiedImageName)) {
            await FileSystem.removeFile(copiedImageName);
        }
    });
});
