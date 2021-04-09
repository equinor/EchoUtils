/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObserverClass, ObserverIdentifier } from './classObserver';
import { elapsedTimeInSeconds } from './formatTimeHelpers';

/**
 * Log configuration
 */
let config = {
    isEnabled: false,
    logWithStackTrace: false,
    notifyLogSubscribers: false,
    isDevelopment: false,
    isMSALLoggingEnabled: false
} as LoggerConfiguration;

/**
 * Internal helper class to keep track of any log-subscribers.
 */
class LogSubscribers extends ObserverClass {
    constructor() {
        super();
    }
}
// The ObserverClass needs a "type" on each subscription. Consumers of the logger (i.e. logSubscriptions) do not
// need to know about this and we just assign the same "type" to all subscribers; this one.
const LogSubscriberType = 'LogSubscriberType';
const logSubscribers: LogSubscribers = new LogSubscribers();

/**
 * The interface for the callback function used for subscribers, @see{addLogSubscriber}.
 *
 * @export
 * @interface SubscriberCallbackFunction
 */
export interface SubscriberCallbackFunction {
    (logOutput: string): void;
}

/**
 * Add a subscriber to the given type. If the configuration is setup to notify subscribers, then the callback
 * given here will be called if a logging is performed on the given type.
 * @param callback {@link SubscriberCallbackFunction}, the function that will be called on log events.
 * @returns a unique identifier for the subscriber which later can be used in {@link removeLogSubscriber}.
 */
export function addLogSubscriber(callback: SubscriberCallbackFunction): ObserverIdentifier {
    return logSubscribers.addSubscriber(callback, LogSubscriberType);
}

/**
 * Remove the given log-subscriber from receiving any further log-notifications.
 * @param identifier The identifier as obtained from {@link addLogSubscriber}
 */
export function removeLogSubscriber(identifier: ObserverIdentifier): void {
    logSubscribers.removeSubscriber(identifier);
}

export interface LoggerConfiguration {
    isEnabled: boolean;
    isDevelopment: boolean;
    logWithStackTrace: boolean;
    notifyLogSubscribers: boolean;
    isMSALLoggingEnabled: boolean;
}

export function setLoggerConfiguration(loggerConfiguration: LoggerConfiguration): void {
    config = loggerConfiguration;
}

enum LogType {
    Info,
    Warn,
    Error,
    Verbose
}

export function logMSAL(...args: any[]): void {
    if (config.isMSALLoggingEnabled) {
        localLog(LogType.Info, ...args);
    }
}

export function logVerbose(...args: any[]): void {
    localLog(LogType.Verbose, ...args);
}

export function logInfo(...args: any[]): void {
    localLog(LogType.Info, ...args);
}

export function logWarn(...args: any[]): void {
    localLog(LogType.Warn, ...args);
}

export function logError(...args: any[]): void {
    localLog(LogType.Error, ...args);
}

const isIOS = (): boolean => {
    const mac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
    return mac;
};

function getStackCallerFunctionName(err: any): string {
    let caller = err.stack.includes('logErrorToAppInsights')
        ? err.stack.split('\n')[9]
        : err.stack.includes('postNotification')
        ? err.stack.split('\n')[6]
        : err.stack.includes('logPerformanceToConsole')
        ? err.stack.split('\n')[4]
        : err.stack.split('\n')[3];
    if (!isIOS() && String(caller).includes('at')) caller = caller.split('at ')[1].split(' (')[0];
    return caller;
}

function localLog(logType: LogType, ...args: any[]): void {
    if (!config.isEnabled) {
        return;
    }

    if (config.notifyLogSubscribers) {
        logSubscribers.notify(args, LogSubscriberType);
    }

    if (config.logWithStackTrace && config.isDevelopment) {
        try {
            throw new Error();
        } catch (err) {
            const callerName = getStackCallerFunctionName(err);
            logWithType(logType, ...args, `[${callerName}]`); //callerName at the end to get colors to work
        }
    } else {
        logWithType(logType, ...args);
    }
}

function logWithType(logType: LogType, ...args: any[]): void {
    if (logType === LogType.Info) console.log(...args);
    else if (logType === LogType.Warn) console.warn(...args);
    else if (logType === LogType.Error) console.error(...args);
    else if (logType === LogType.Verbose) console.log(...args);
}

export function logPerformanceToConsole(message: string, startTime: number): void {
    const timeInSeconds = elapsedTimeInSeconds(startTime);
    let color = 'green';
    if (timeInSeconds > 0.3) color = 'orange';
    if (timeInSeconds > 1) color = 'red';

    logVerbose('%c%s %c%s', `color: black;`, message, `color: ${color};`, timeInSeconds.toFixed(3) + ' sec(s)');
}
