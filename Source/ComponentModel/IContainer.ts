import {IComponent} from './IComponent';
import {ComponentCollection} from './ComponentCollection';
import {IDisposable} from '@typescript-standard-library/core/Source/types';


export interface IContainer extends IDisposable {
    readonly components: ComponentCollection;

    add(component: IComponent, name?: string): void;
    remove(component: IComponent): void;
}
