import {Loader} from '../../../Source/Boot/Loader';
import {LoaderConfiguration} from '../../../Source/Boot/LoaderConfiguration';
import {Registry} from './_Samples/Loader/Registry';


describe(`Loader`, () => {

    test('loading modules tree', async () => {
        let configuration: LoaderConfiguration = new LoaderConfiguration(`${__dirname}/_Samples`);
        let loader: Loader = new Loader(configuration);

        expect(Registry.modules.length).toBe(0);

        await loader.load();

        expect(Registry.modules.length).toBe(3);

        const {ModuleA} = await import('./_Samples/Loader/ModuleA');
        const {ModuleB} = await import('./_Samples/Loader/SubDirectory/ModuleB');
        const {ModuleC} = await import('./_Samples/Loader/SubDirectory/ModuleC');

        expect(Registry.modules.contains(ModuleA)).toBe(true);
        expect(Registry.modules.contains(ModuleB)).toBe(true);
        expect(Registry.modules.contains(ModuleC)).toBe(true);
    });

});
