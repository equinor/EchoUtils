import { addLogSubscriber, logError, logInfo, logMSAL, logPerformanceToConsole, logVerbose, logWarn, removeLogSubscriber, setLoggerConfiguration } from '../../utils/logger';

// Mock the time helpers so that we can control the timing in the tests
// Do note that we seemingly need to have the jest.mock _before_ the import statement to have thing work properly...
jest.mock('../../utils/formatTimeHelpers');
import { ElapsedTimeInSeconds } from '../../utils/formatTimeHelpers';

describe('Logger behaves as expected', () => {
    let logSpy, warnSpy, errorSpy;
    
    const mockElapsedTimeInSeconds = ElapsedTimeInSeconds as jest.Mock;

    beforeEach(() => {
        logSpy = jest.spyOn(console, 'log');
        warnSpy = jest.spyOn(console, 'warn');
        errorSpy = jest.spyOn(console, 'error');
    });

    afterEach(() => {
        logSpy.mockReset();
        warnSpy.mockReset();
        errorSpy.mockReset();
        mockElapsedTimeInSeconds.mockReset();
    });
    
    it('when log flag is set to disabled does not log anything', () => {
        // :: Arrange
        setLoggerConfiguration({
            isEnabled: false,
            isDevelopment: false,
            logWithStackTrace: false,
            notifyLogSubscribers: false,
            isMSALLoggingEnabled: false
        });

        // :: Act
        logInfo('Hello', 'World');
        logWarn('Hello', 'World');
        logError('Hello', 'World');

        // :: Assert
        expect(logSpy).not.toBeCalled();
        expect(warnSpy).not.toBeCalled();
        expect(errorSpy).not.toBeCalled();
    });

    it('logInfo', () => {
        // :: Arrange
        setLoggerConfiguration({
            isEnabled: true,
            isDevelopment: false,
            logWithStackTrace: false,
            notifyLogSubscribers: false,
            isMSALLoggingEnabled: false
        });

        // :: Act
        logInfo('Hello', 'World');

        // :: Assert
        expect(logSpy).toHaveBeenCalledWith('Hello', 'World');
        expect(warnSpy).not.toBeCalled();
        expect(errorSpy).not.toBeCalled();
    });

    it('logWarn', () => {
        // :: Arrange
        setLoggerConfiguration({
            isEnabled: true,
            isDevelopment: false,
            logWithStackTrace: false,
            notifyLogSubscribers: false,
            isMSALLoggingEnabled: false
        });

        // :: Act
        logWarn('Hello', 'World');

        // :: Assert
        expect(logSpy).not.toBeCalled();
        expect(warnSpy).toHaveBeenCalledWith('Hello', 'World');
        expect(errorSpy).not.toBeCalled();
    });

    it('logError', () => {
        // :: Arrange
        setLoggerConfiguration({
            isEnabled: true,
            isDevelopment: false,
            logWithStackTrace: false,
            notifyLogSubscribers: false,
            isMSALLoggingEnabled: false
        });

        // :: Act
        logError('Hello', 'World');

        // :: Assert
        expect(logSpy).not.toBeCalled();
        expect(warnSpy).not.toBeCalled();
        expect(errorSpy).toHaveBeenCalledWith('Hello', 'World');
    });

    it('logVerbose', () => {
        // :: Arrange
        setLoggerConfiguration({
            isEnabled: true,
            isDevelopment: false,
            logWithStackTrace: false,
            notifyLogSubscribers: false,
            isMSALLoggingEnabled: false
        });

        // :: Act
        logVerbose('Hello', 'World');

        // :: Assert
        expect(logSpy).toHaveBeenCalledWith('Hello', 'World');
        expect(warnSpy).not.toBeCalled();
        expect(errorSpy).not.toBeCalled();
    });

    it('logMSAL enabled should log', () => {
        // :: Arrange
        setLoggerConfiguration({
            isEnabled: true,
            isDevelopment: false,
            logWithStackTrace: false,
            notifyLogSubscribers: false,
            isMSALLoggingEnabled: true
        });

        // :: Act
        logMSAL('Hello', 'World');

        // :: Assert
        expect(logSpy).toHaveBeenCalledWith('Hello', 'World');
        expect(warnSpy).not.toBeCalled();
        expect(errorSpy).not.toBeCalled();
    });

    it('logMSAL disabled should not log', () => {
        // :: Arrange
        setLoggerConfiguration({
            isEnabled: true,
            isDevelopment: false,
            logWithStackTrace: false,
            notifyLogSubscribers: false,
            isMSALLoggingEnabled: false
        });

        // :: Act
        logMSAL('Hello', 'World');

        // :: Assert
        expect(logSpy).not.toBeCalled();
        expect(warnSpy).not.toBeCalled();
        expect(errorSpy).not.toBeCalled();
    });

    it('logPerformanceToConsole GREEN', () => {
        // :: Arrange
        setLoggerConfiguration({
            isEnabled: true,
            isDevelopment: false,
            logWithStackTrace: false,
            notifyLogSubscribers: false,
            isMSALLoggingEnabled: false
        });
        
        mockElapsedTimeInSeconds.mockReturnValue(0.1);

        // :: Act
        logPerformanceToConsole('This is quite fast', 1000);

        // :: Assert
        expect(logSpy).toHaveBeenCalledWith(
            '%c%s %c%s',
            `color: black;`,
            'This is quite fast',
            'color: green;',
            (0.1).toFixed(3) + ' sec(s)'
        );
        expect(warnSpy).not.toBeCalled();
        expect(errorSpy).not.toBeCalled();
    });

    it('logPerformanceToConsole YELLOW', () => {
        // :: Arrange
        setLoggerConfiguration({
            isEnabled: true,
            isDevelopment: false,
            logWithStackTrace: false,
            notifyLogSubscribers: false,
            isMSALLoggingEnabled: false
        });
        
        mockElapsedTimeInSeconds.mockReturnValue(0.4);

        // :: Act
        logPerformanceToConsole('This is not so fast', 1000);

        // :: Assert
        expect(logSpy).toHaveBeenCalledWith(
            '%c%s %c%s',
            `color: black;`,
            'This is not so fast',
            'color: orange;',
            (0.4).toFixed(3) + ' sec(s)'
        );
        expect(warnSpy).not.toBeCalled();
        expect(errorSpy).not.toBeCalled();
    });
    
    it('logPerformanceToConsole RED', () => {
        // :: Arrange
        setLoggerConfiguration({
            isEnabled: true,
            isDevelopment: false,
            logWithStackTrace: false,
            notifyLogSubscribers: false,
            isMSALLoggingEnabled: false
        });
        
        mockElapsedTimeInSeconds.mockReturnValue(1.23456);

        // :: Act
        logPerformanceToConsole('SLOOOOW!', 1000);

        // :: Assert
        expect(logSpy).toHaveBeenCalledWith(
            '%c%s %c%s',
            `color: black;`,
            'SLOOOOW!',
            'color: red;',
            (1.23456).toFixed(3) + ' sec(s)'
        );
        expect(warnSpy).not.toBeCalled();
        expect(errorSpy).not.toBeCalled();
    });
});

describe('LogSubscriptions behaves as expected', () => {
    it('addSubscribers with notifyLogSubscribers enabled', () => {
        // :: Arrange
        setLoggerConfiguration({
            isEnabled: true,
            isDevelopment: false,
            logWithStackTrace: false,
            notifyLogSubscribers: true,
            isMSALLoggingEnabled: false
        });
        const subscriberCallback = jest.fn();

        // :: Act
        const subscriberId = addLogSubscriber(subscriberCallback);
        logInfo('Hello');
        logWarn('World');
        logError('!');

        // :: Assert
        expect(subscriberCallback).toBeCalledTimes(3);
        expect(subscriberCallback).toBeCalledWith(['Hello']);
        expect(subscriberCallback).toBeCalledWith(['World']);
        expect(subscriberCallback).toBeCalledWith(['!']);

        expect(subscriberId).toBeGreaterThan(0);
    });

    it('removeLogSubscriber prevents further notifications from being received', () => {
        // :: Arrange
        setLoggerConfiguration({
            isEnabled: true,
            isDevelopment: false,
            logWithStackTrace: false,
            notifyLogSubscribers: true,
            isMSALLoggingEnabled: false
        });
        const subscriberCallback = jest.fn();

        // :: Act
        const subscriberId = addLogSubscriber(subscriberCallback);
        removeLogSubscriber(subscriberId);
        logInfo('Hello');
        logWarn('World');
        logError('!');

        // :: Assert
        expect(subscriberCallback).not.toBeCalled();
    });
});
