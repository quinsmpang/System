import { ISite } from './ISite';
import { EventEmitter } from '@typescript-standard-library/core/Source/Events/EventEmitter';
import { IDisposable } from '@typescript-standard-library/core/Source/types';
export interface IComponent extends EventEmitter, IDisposable {
    site: ISite;
}
