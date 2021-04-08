import classObserver, { ObserverIdentifier } from '../../utils/classObserver';

describe('ClassObserver ', () => {
    it('Subscriptions', () => {
        // :: Arrange
        const func = jest.fn();
        const typeName = 'someType';

        // :: Act
        const observerId: ObserverIdentifier = classObserver.addSubscriber(func, typeName);

        // :: Assert
        expect(observerId).not.toBeNull();
        expect(observerId).toBeGreaterThan(0);
    });

    it('notifications', () => {
        // :: Arrange
        const firstFunc = jest.fn();
        const secondFunc = jest.fn();
        const typeName = 'someType';
        const otherTypeName = 'someOtherType'
        classObserver.addSubscriber(firstFunc, typeName);
        classObserver.addSubscriber(secondFunc, otherTypeName);

        // :: Act
        classObserver.notify<string>("hello world", typeName);

        // :: Assert
        expect(firstFunc).toBeCalledWith("hello world");
        expect(secondFunc).not.toBeCalled();
    });

    it('Unsubscribe', () => {
        // :: Arrange
        const func = jest.fn();
        const typeName = 'someType';
        const observerId: ObserverIdentifier = classObserver.addSubscriber(func, typeName);

        // :: Act
        classObserver.removeSubscriber(observerId);
        classObserver.notify<string>("hello world", typeName);

        // :: Assert
        expect(func).not.toBeCalled();        
    });
});
