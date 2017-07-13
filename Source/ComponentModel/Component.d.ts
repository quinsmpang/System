import { EventEmitter } from '@typescript-standard-library/core/Source/Events/EventEmitter';
import { IDisposable } from '@typescript-standard-library/core/Source/types';
export declare class Component extends EventEmitter implements IDisposable {
    private _isDisposed;
    readonly isDisposed: boolean;
    dispose(): void;
}
