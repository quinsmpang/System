import {IContainer} from './IContainer';
import {ComponentCollection} from './ComponentCollection';
import {IComponent} from './IComponent';
import {IDisposable} from '@typescript-standard-library/core/Source/types';
import {Assert} from '@typescript-standard-library/core/Source/Assertion/Assert';


export class Container implements IContainer, IDisposable {
    private _components: ComponentCollection = new ComponentCollection();
    private _isDisposed: boolean = false;


    public get components(): ComponentCollection {
        return this._components;
    }


    public get isDisposed(): boolean {
        return this._isDisposed;
    }


    public add(component: IComponent): void {
        Assert.argument('component', component).notNull();

        Array.prototype.push.call(this._components, component);
    }


    public remove(component: IComponent): void {
        Assert.argument('component', component).notNull();

        let indexOfComponent: number = Array.prototype.indexOf.call(this._components, component);

        if (indexOfComponent >= 0) {
            Array.prototype.splice.call(this._components, indexOfComponent, 1);
        }
    }


    public dispose(): void {
        this._isDisposed = true;
    }
}
