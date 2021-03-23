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
        const func = jest.fn();
        const typeName = 'someType';
        classObserver.addSubscriber(func, typeName);

        // :: Act
        classObserver.notify<string>("hello world", typeName);

        // :: Assert
        expect(func).toBeCalledWith("hello world");
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
