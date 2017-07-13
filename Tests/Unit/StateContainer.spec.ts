import {IStateReceiver} from '../../Source/ComponentModel/IStateReceiver';
import {StateContainer} from '../../Source/ComponentModel/StateContainer';
import {TestState} from '../Mocks/TestState';
import {TestAction} from '../Mocks/TestAction';
import {TestStateContainer} from '../Mocks/TestStateContainer';
import {ArgumentNullException} from '@typescript-standard-library/core/Source/Exceptions/ArgumentNullException';


describe(`StateContainer`, () => {
    let instance: StateContainer<TestState, TestAction> = null;


    function createStateReceiver(): IStateReceiver<TestState> {
        return {
            receiveState: jest.fn()
        };
    }


    beforeEach(() => {
        expect(() => {
            instance = new TestStateContainer();
        }).not.toThrow();
    });


    describe(`#constructor()`, () => {
        it(`creates new instance`, () => {
            expect(instance).toBeInstanceOf(StateContainer);
        });
    });


    describe(`#state`, () => {
        it(`represents state at the current moment of time`, () => {
            expect(instance.state).toBeInstanceOf(Object);
        });
    });


    describe(`#addReceiver()`, () => {
        it(`throws if state receiver is not a function`, () => {
            expect(() => {
                instance.addReceiver(null);
            }).toThrowError(ArgumentNullException);
        });


        it(`adds state receiver to state container`, () => {
            let watcher = createStateReceiver();

            expect(watcher.receiveState).toHaveBeenCalledTimes(0);

            instance.addReceiver(watcher);

            expect(watcher.receiveState).toHaveBeenCalledTimes(1);

            instance.dispatch(new TestAction(true));

            expect(watcher.receiveState).toHaveBeenCalledTimes(2);
        });
    });


    describe(`#removeReceiver()`, () => {
        it(`throws if watcher is \`null\` or \`undefined\``, () => {
            expect(() => {
                instance.removeReceiver(null);
            }).toThrowError(ArgumentNullException);
        });


        describe(`removes watcher function from state container`, () => {
            it(`returns \`true\` if such watcher was attached to state container`, () => {
                let watcher = createStateReceiver();
                let isRemoved: boolean = false;

                instance.addReceiver(watcher);

                expect(() => {
                    isRemoved = instance.removeReceiver(watcher);
                }).not.toThrow();

                expect(isRemoved).toBe(true);
            });


            it(`returns \`false\` if such watcher wasn't attached to state container`, () => {
                let watcher = createStateReceiver();
                let isRemoved: boolean = false;

                expect(() => {
                    isRemoved = instance.removeReceiver(watcher);
                }).not.toThrow();

                expect(isRemoved).toBe(false);
            });
        });
    });


    describe(`#dispatchAction()`, () => {
        it(`throws if action is \`null\` or \`undefined\``, () => {
            expect(() => {
                instance.dispatch(null);
            }).toThrowError(ArgumentNullException);

            expect(() => {
                instance.dispatch(undefined);
            }).toThrowError(ArgumentNullException);
        });


        it('triggers state mutation and dispatches state to all watchers', () => {
            let watcher = createStateReceiver();

            instance.addReceiver(watcher);

            expect(watcher.receiveState).toHaveBeenCalledTimes(1);

            instance.dispatch(new TestAction(true));
            instance.dispatch(new TestAction(false));

            expect(watcher.receiveState).toHaveBeenCalledTimes(3);

            expect(instance.state.totalTestsCount).toBe(2);
            expect(instance.state.passedTestsCount).toBe(1);
            expect(instance.state.fallenTestsCount).toBe(1);
        });
    });


    describe(`#resetState()`, () => {
        it(`resets state to it's initial value`, () => {
            instance.dispatch(new TestAction(true));

            expect(instance.state.totalTestsCount).toBe(1);
            expect(instance.state.passedTestsCount).toBe(1);
            expect(instance.state.fallenTestsCount).toBe(0);

            expect(() => {
                instance.resetState();
            }).not.toThrow();

            expect(instance.state.totalTestsCount).toBe(0);
            expect(instance.state.passedTestsCount).toBe(0);
            expect(instance.state.fallenTestsCount).toBe(0);
        });
    });
});