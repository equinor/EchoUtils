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
        const timer = new Timer({ maxTime: 500 });
        expect(timer.status).toBe('Not started');
        timer.start();
        expect(timer.status).toBe('Started');

        jest.advanceTimersByTime(450);
        expect(timer.timeElapsed).toBeLessThan(500);

        jest.advanceTimersByTime(51);
        expect(timer.timeElapsed).toBeGreaterThanOrEqual(500);

        timer.stop();
        expect(timer.status).toBe('Stopped');
    });

    it('should auto stop after x milliseconds', () => {
        const timer = new Timer({ maxTime: 500 });
        timer.start();
        jest.advanceTimersByTime(520);
        expect(timer.status).toBe('Over time');
    });

    it('should invoke the callback after timer is stopped', () => {
        const mockCallback = jest.fn(() => undefined);
        const timer = new Timer({ maxTime: 200, callback: mockCallback });
        timer.start();
        jest.advanceTimersByTime(220);
        timer.stop();
        mockCallback();
        expect(timer.status).toBe('Stopped');
        expect(mockCallback).toBeCalledTimes(2);
    });
});
