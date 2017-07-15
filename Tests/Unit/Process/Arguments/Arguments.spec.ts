import {Arguments} from '../../../../Source/Process/Arguments/Arguments';
import {ReadOnlyCollection} from '@typescript-standard-library/core/Source/Collections/ReadOnlyCollection';
import {Option} from '../../../../Source/Process/Arguments/Option';
import {OptionsCollection} from '../../../../Source/Process/Arguments/OptionsCollection';


describe('Arguments', () => {
    let instance: Arguments;


    beforeEach(() => {
        instance = new Arguments(
            'node',
            'npm',
            new ReadOnlyCollection(['' +
                'install',
                'ts-kit'
            ]),
            new OptionsCollection([
                new Option('--save', true),
                new Option('--source', 'npm')
            ])
        );
    });


    describe('#constructor()', () => {
        it('creates new instance', () => {
            expect(instance).toBeInstanceOf(Arguments);

            expect(instance.executablePath).toBe('node');
            expect(instance.mainModulePath).toBe('npm');

            expect(instance.commands).toBeInstanceOf(ReadOnlyCollection);
            expect(instance.commands.length).toBe(2);
            expect(instance.commands[0]).toBe('install');
            expect(instance.commands[1]).toBe('ts-kit');

            expect(instance.options.length).toBe(2);
            expect(instance.options[0].key).toBe('--save');
            expect(instance.options[0].isLogical).toBe(true);
            expect(instance.options[0].value).toBe(true);
            expect(instance.options[1].key).toBe('--source');
            expect(instance.options[1].isLogical).toBe(false);
            expect(instance.options[1].value).toBe('npm');
        });
    });


    describe(`#toString()`, () => {
        it(`serializes arguments to string`, () => {
            expect(instance.toString()).toBe('node npm install ts-kit --save --source npm');
        });
    });
});

