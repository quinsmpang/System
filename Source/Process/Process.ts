import * as net from 'net';
import {Readable, Writable} from 'stream';
import {ChildProcess as NodeChildProcess, spawn, SpawnOptions} from 'child_process';
import {NoAssociatedProcessException} from './NoAssociatedProcessException';
import {ProcessEvent, ProcessEventType} from './ProcessEvent';
import {ProcessStartInfo} from './ProcessStartInfo';
import {ProcessMessageEvent} from './ProcessMessageEvent';
import {ProcessIOMode} from './types';
import {ProcessMessage} from './ProcessMessage';
import {StandardInputStream} from './StandardInputStream';
import {StandardOutputStream} from './StandardOutputStream';
import {StandardErrorStream} from './StandardErrorStream';
import {IDisposable} from '@typescript-standard-library/core/Source/types';
import {EventEmitter} from '@typescript-standard-library/core/Source/Events/EventEmitter';
import {ErrorEvent} from '@typescript-standard-library/core/Source/Events/ErrorEvent';
import {Assert} from '@typescript-standard-library/core/Source/Assertion/Assert';
import {DeferredObject} from '@typescript-standard-library/core/Source/Async/DeferredObject';
import {InvalidOperationException} from '@typescript-standard-library/core/Source/Exceptions/InvalidOperationException';
import {Method} from '@typescript-standard-library/core/Source/Language/Decorators/Method';
import * as util from 'util';


export class Process extends EventEmitter implements IDisposable {
    /**
     * @throws {ArgumentNullException} If 'fileName' argument is not defined.
     * @throws {ArgumentNullException} If 'args' argument is not defined.
     */
    public static start(fileName: string, ...args: string[]): Process {
        Assert.argument('fileName', fileName).notNull();
        Assert.argument('args', args).notNull();

        let process: Process = new Process(new ProcessStartInfo(fileName, ...args));

        process.start();

        return process;
    }


    public static run(fileName: string, ...args: string[]): Promise<Process> {
        Assert.argument('fileName', fileName).notNull();
        Assert.argument('args', args).notNull();

        let deferred: DeferredObject<Process> = new DeferredObject<Process>();
        let process: Process = new Process(new ProcessStartInfo(fileName, ...args));

        process.addEventListener(ProcessEvent.EXIT, () => {
            deferred.resolve(process);
        });

        process.addEventListener(ErrorEvent.ERROR, (event: ErrorEvent) => {
            deferred.reject(event.error);
        });

        process.start();

        return deferred.promise;
    }


    private _startInfo: ProcessStartInfo;
    private _nativeProcess: NodeChildProcess;
    private _terminationSignal: string = undefined;
    private _exitCode: number = undefined;
    private _hasExited: boolean = false;
    private _isDisposed: boolean = false;


    public get isDisposed(): boolean {
        return this._isDisposed;
    }


    public get id(): number {
        this.throwIfNoAssociatedProcess();

        return this._nativeProcess.pid;
    }


    public get startInfo(): ProcessStartInfo {
        return this._startInfo;
    }


    public set startInfo(value: ProcessStartInfo) {
        Assert.argument('value', value).notNull();

        this._startInfo = value;
    }


    public get isConnected(): boolean {
        return this._nativeProcess && this._nativeProcess.connected;
    }


    public get hasExited(): boolean {
        this.throwIfNoAssociatedProcess();

        return this._hasExited;
    }


    public get exitCode(): number {
        this.throwIfNoAssociatedProcess();

        return this._exitCode;
    }


    public get terminationSignal(): string {
        this.throwIfNoAssociatedProcess();

        return this._terminationSignal;
    }


    public get standardInput(): StandardInputStream {
        this.throwIfNoAssociatedProcess();

        return new StandardInputStream(this._nativeProcess.stdin);
    }


    public constructor(startInfo: ProcessStartInfo) {
        super();

        Assert.argument('startInfo', startInfo).notNull();

        this._startInfo = startInfo;
    }

    /**
     * @throws {InvalidOperationException} If process already running.
     */
    public start(): void {
        if (this._nativeProcess) {
            throw new InvalidOperationException(`Process already running.`);
        }

        this.notify(ProcessEvent.START);

        this.spawnProcess();

        this._nativeProcess.once('exit', this.onExit);
        this._nativeProcess.once('close', this.onClose);
        this._nativeProcess.once('disconnect', this.onDisconnect);
        this._nativeProcess.on('error', this.onError);
        this._nativeProcess.on('message', this.onMessage);
    }


    public sendMessage(message: ProcessMessage): Promise<void> {
        Assert.argument('message', message).notNull();

        this.throwIfNoAssociatedProcess();

        let deferred: DeferredObject = new DeferredObject();

        this._nativeProcess.send(message.message, message.handle, {
            keepOpen: message.keepOpen
        }, (error: Error): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }

    /**
     * @throws {ArgumentNullException} If 'signal' argument is not defined.
     * @throws {NoAssociatedProcessException} If current instance does not have associated process descriptor.
     */
    public kill(signal: string = 'SIGTERM'): Promise<number> {
        Assert.argument('signal', signal).notNull();

        this.throwIfNoAssociatedProcess();

        let deferred: DeferredObject<number> = new DeferredObject<number>();

        let onExit = (exitCode: number) => {
            deferred.resolve(exitCode);

            this._nativeProcess.removeListener('error', onError);
        };

        let onError = (error: Error) => {
            deferred.reject(error);

            this._nativeProcess.removeListener('exit', onExit);
        };

        this._nativeProcess.once('exit', onExit);
        this._nativeProcess.once('error', onError);

        this._nativeProcess.kill(signal);

        return deferred.promise;
    }


    public async disconnect(): Promise<void> {
        this.throwIfNoAssociatedProcess();

        this._nativeProcess.disconnect();
    }


    public dispose(): void {
        if (!this.isDisposed) {
            this._isDisposed = true;

            this._nativeProcess.removeAllListeners();
        }
    }

    /**
     * @inheritDoc
     */
    protected notify(eventType: ProcessEventType): void {
        let event: ProcessEvent = new ProcessEvent(eventType, this);

        this.dispatchEvent(event);
    }


    private spawnProcess(): void {
        this._nativeProcess = spawn(
            this.startInfo.fileName,
            this.startInfo.commandLineArguments,
            this.getSpawnCommandOptions()
        );
    }


    private getSpawnCommandOptions(): SpawnOptions {
        let startInfo: ProcessStartInfo = this.startInfo;

        let options = {
            cwd: startInfo.workingDirectory,
            detached: startInfo.isDetached,
            env: startInfo.environment,
            shell: (startInfo.shellName && startInfo.useShellExecute) ? startInfo.shellName : startInfo.useShellExecute,
            uid: startInfo.ownerUserId,
            gid: startInfo.ownerGroupId,
            stdio: [
                this.getStandardInput(),
                this.getStandardOutput(),
                this.getStandardError()
            ]
        };

        process.stdout.write(util.inspect(options, false, 10, true));

        return options;
    }


    private getStandardInput(): Writable | ProcessIOMode {
        let standardInput: StandardInputStream | ProcessIOMode = this.startInfo.standardInput;

        if (standardInput instanceof StandardInputStream) {
            return standardInput.baseStream;
        }

        return standardInput;
    }


    private getStandardOutput(): Readable | ProcessIOMode {
        let standardOutput: StandardOutputStream | ProcessIOMode = this.startInfo.standardOutput;

        if (standardOutput instanceof StandardOutputStream) {
            return standardOutput.baseStream;
        }

        return standardOutput;
    }


    private getStandardError(): Readable | ProcessIOMode {
        let standardError: StandardErrorStream | ProcessIOMode = this.startInfo.standardError;

        if (standardError instanceof StandardErrorStream) {
            return standardError.baseStream;
        }

        return standardError;
    }


    @Method.attached()
    private onDisconnect(): void {
        this.notify(ProcessEvent.DISCONNECT);
    }


    @Method.attached()
    private onClose(exitCode: number, terminationSignal: string): void {
        if (terminationSignal) {
            this.onNativeProcessTerminate(terminationSignal);
        } else {
            this.onNativeProcessClose(exitCode);
        }
    }


    @Method.attached()
    private onExit(exitCode: number, terminationSignal: string): void {
        if (terminationSignal) {
            this.onNativeProcessTerminate(terminationSignal);
        } else {
            this.onNativeProcessExit(exitCode);
        }

        this._hasExited = true;
    }


    @Method.attached()
    private onError(error: Error): void {
        this.dispatchEvent(new ErrorEvent(error));
    }


    @Method.attached()
    private onMessage(payload: object | number | string, handle?: net.Socket | net.Server): void {
        let message: ProcessMessage = new ProcessMessage(payload);

        message.handle = handle;

        this.dispatchEvent(new ProcessMessageEvent(this, message));
    }


    private onNativeProcessExit(exitCode: number): void {
        if (this._exitCode == null) {
            this._exitCode = exitCode;

            this.notify(ProcessEvent.EXIT);
        }
    }


    private onNativeProcessTerminate(terminationSignal: string): void {
        if (this._terminationSignal == null) {
            this._terminationSignal = terminationSignal;

            this.notify(ProcessEvent.TERMINATE);
        }
    }


    private onNativeProcessClose(exitCode: number): void {
        if (this._exitCode == null) {
            this._exitCode = exitCode;

            this.notify(ProcessEvent.CLOSE);
        }
    }


    private throwIfNoAssociatedProcess(): void {
        if (!this._nativeProcess) {
            throw new NoAssociatedProcessException(this);
        }
    }
}
