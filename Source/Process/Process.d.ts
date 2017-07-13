import { ProcessEventType } from './ProcessEvent';
import { ProcessStartInfo } from './ProcessStartInfo';
import { ProcessMessage } from './ProcessMessage';
import { StandardInputStream } from './StandardInputStream';
import { IDisposable } from '@typescript-standard-library/core/Source/types';
import { EventEmitter } from '@typescript-standard-library/core/Source/Events/EventEmitter';
export declare class Process extends EventEmitter implements IDisposable {
    static start(fileName: string, ...args: string[]): Process;
    static run(fileName: string, ...args: string[]): Promise<Process>;
    private _startInfo;
    private _nativeProcess;
    private _terminationSignal;
    private _exitCode;
    private _hasExited;
    private _isDisposed;
    readonly isDisposed: boolean;
    readonly id: number;
    startInfo: ProcessStartInfo;
    readonly isConnected: boolean;
    readonly hasExited: boolean;
    readonly exitCode: number;
    readonly terminationSignal: string;
    readonly standardInput: StandardInputStream;
    constructor(startInfo: ProcessStartInfo);
    start(): void;
    sendMessage(message: ProcessMessage): Promise<void>;
    kill(signal?: string): Promise<number>;
    disconnect(): Promise<void>;
    dispose(): void;
    protected notify(eventType: ProcessEventType): void;
    private spawnProcess();
    private getSpawnCommandOptions();
    private getStandardInput();
    private getStandardOutput();
    private getStandardError();
    private onDisconnect();
    private onClose(exitCode, terminationSignal);
    private onExit(exitCode, terminationSignal);
    private onError(error);
    private onMessage(payload, handle?);
    private onNativeProcessExit(exitCode);
    private onNativeProcessTerminate(terminationSignal);
    private onNativeProcessClose(exitCode);
    private throwIfNoAssociatedProcess();
}
