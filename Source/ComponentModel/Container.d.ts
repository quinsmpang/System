import { IContainer } from './IContainer';
import { ComponentCollection } from './ComponentCollection';
import { IComponent } from './IComponent';
import { IDisposable } from '@typescript-standard-library/core/Source/types';
export declare class Container implements IContainer, IDisposable {
    private _components;
    private _isDisposed;
    readonly components: ComponentCollection;
    readonly isDisposed: boolean;
    add(component: IComponent): void;
    remove(component: IComponent): void;
    dispose(): void;
}
