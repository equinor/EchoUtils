export { fireAndForget } from './asyncUtils';
export { ObserverClass } from './classObserver';
export type { ObserverIdentifier, ObserverInterface } from './classObserver';
export { defaultSearchParams, getDeepLinkParam, getDeepLinkParams, setDeepLinkParam } from './deepLinkParams';
export * from './formatString';
export {
    dateToStringOrEmpty,
    diffHours,
    diffMinutes,
    elapsedTimeInSeconds,
    elapsedTimeInSecondsBetween,
    elapsedTimeInSecondsToFixed
} from './formatTimeHelpers';
export {
    addLogSubscriber,
    logError,
    logInfo,
    logMSAL,
    logPerformanceToConsole,
    logVerbose,
    logWarn,
    removeLogSubscriber,
    setLoggerConfiguration
} from './logger';
export type { LoggerConfiguration, SubscriberCallbackFunction } from './logger';
export { arraysIsEqual, objectIsEmpty, objectsIsEqual } from './objectUtils';
