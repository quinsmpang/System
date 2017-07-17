import {Application} from '@typescript-standard-library/core/Source/Application/Application';
import {Method} from '@typescript-standard-library/core/Source/Language/Decorators/Method';


export abstract class NodeApplication extends Application {
    public constructor() {
        super();

        process.on('unhandledRejection', this.onUnhandledRejection);
    }


    @Method.attached()
    protected onUnhandledRejection(error: any): void {
        throw error;
    }
}
