import {HashSet} from '@typescript-standard-library/core/Source/Collections/HashSet';


export class Registry {
    public static readonly modules: HashSet<Function> = new HashSet();


    public static register(): ClassDecorator {
        return (cls: Function) => {
            this.modules.add(cls);
        };
    }
}
