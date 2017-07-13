import {Constructor} from '@typescript-standard-library/core/Source/types';


export interface IServiceProvider {
    getService<T>(type: Constructor<T>): T;
}
