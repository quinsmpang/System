import {Event} from '@typescript-standard-library/core/Source/Events/Event';
import {EventEmitter} from '@typescript-standard-library/core/Source/Events/EventEmitter';
import {IDisposable} from '@typescript-standard-library/core/Source/types';


export class Component extends EventEmitter implements IDisposable {
    private _isDisposed: boolean = false;
    
    
    public get isDisposed(): boolean {
        return this._isDisposed;
    }


    public dispose(): void {
        this._isDisposed = true;

        this.dispatchEvent(new Event('disposed'));
    }
}
