import { Timer } from '.';

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
});

describe('timer', () => {
    it('should start and stop', () => {
        // Timer is constructed with default maxTime of 2 seconds.
        const timer = new Timer();
        expect(timer.maxTime).toBe(2000);
        expect(timer.status).toBe('Not started');

        timer.start();
        expect(timer.status).toBe('Started');

        timer.stop();
        expect(timer.status).toBe('Stopped');
    });

    it('should auto stop after x milliseconds', () => {
        const timer = new Timer({ maxTime: 500 });
        timer.start();
        jest.advanceTimersByTime(520);
        expect(timer.status).toBe('Over time');
    });

    it('should report correct time elapsed', () => {
        const timer = new Timer({ maxTime: 500 });

        // Timer is not yet started, so should be 0.
        expect(timer.timeElapsed).toBeLessThanOrEqual(0);

        timer.start();

        jest.advanceTimersByTime(450);
        expect(timer.timeElapsed).toBeLessThan(500);

        jest.advanceTimersByTime(51);
        expect(timer.timeElapsed).toBeGreaterThanOrEqual(500);

        // Stopping the timer will take a few microseconds.
        timer.stop();
        expect(timer.timeElapsed).toBeCloseTo(501);
    });
    it('should not allow the timer to start twice', () => {
        const timer = new Timer({ maxTime: 500 });
        timer.start();
        expect(() => timer.start()).toThrow(new Error('A timer is already active.'));
    });
    it('should invoke the callback when the timer is finished', () => {
        const callback = jest.fn();
        const timer = new Timer({ maxTime: 500, callback });
        timer.start();
        jest.advanceTimersByTime(20);
        timer.stop();
        expect(callback).toHaveBeenCalledTimes(1);
    });
    it('should not invoke the callback if the timer is over time', () => {
        const callback = jest.fn();
        const timer = new Timer({ maxTime: 500, callback });
        timer.start();
        jest.advanceTimersByTime(501);

        // The callback test above will have already performed this callback once.
        expect(callback).toHaveBeenCalledTimes(1);
    });
});
