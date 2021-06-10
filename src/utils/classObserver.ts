export type ObserverIdentifier = number;

/**
 * The interface to implement if one wants to use a subscriber pattern on the implementing class.
 */
export interface ObserverInterface {
    id: ObserverIdentifier;
    callback: Function;
    type: string;
}

/**
 * Utility class to ease usage of a subscription pattern - i.e. if one needs to have subscriptions (callable functions)
 * from consumers, this helper class will handle it, ensuring that subscribers are being persisted and notified when
 * required.
 *
 * The class was copied as-is from EchoCore and was written by Hanna Bottom - all credits to her.
 */
class ClassObserver {
    private id: ObserverIdentifier;
    private observers: ObserverInterface[];

    constructor() {
        this.id = 0;
        this.observers = [];
    }

    /**
     * Add a subscriber to the observer.
     * Later the implementing class can call {@link notify} to notify all subscribers of a given type.
     * @param callback the callback function to be called on {@link notify}
     * @param type the "type" of subscriber
     * @returns {@link ObserverIdentifier}, a unique id identifying the subscriber
     */
    addSubscriber(callback: Function, type: string): ObserverIdentifier {
        this.id++;
        const functionCallback = { id: this.id, callback, type };
        this.observers.push(functionCallback);
        return this.id;
    }

    /**
     * Remove the given subscriber from receiving further notifications.
     * @param id the {@link ObserverIdentifier} of the subscriber, as obtained from {@link addSubscriber}
     */
    removeSubscriber(id: ObserverIdentifier): void {
        this.observers = this.observers.filter((item) => item.id !== id);
    }

    /**
     * Notify any subscribers with the given type and using the given data.
     * @param data The data to use as a parameter in the callback function for the subscribers,
     * @param type The type of subscriber
     */
    notify<T>(data: T, type: string): void {
        this.observers.forEach((observer) => {
            if (observer.type === type) {
                observer.callback(data);
            }
        });
    }
}

export default new ClassObserver();

export const ObserverClass = ClassObserver;
