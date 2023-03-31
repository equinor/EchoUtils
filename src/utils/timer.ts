import { logWarn } from './logger';

interface TimerProps {
    /** Set a upper threshold for the timer, which will make the timer autostop. Default is 2000 milliseconds. */
    maxTime?: number;
    /** Optional callback. Check the this reference binding as it will default to {Timer} */
    callback?: () => void;
}

type TimerStatus = 'Started' | 'Stopped' | 'Over time' | 'Not started';

export class Timer {
    /** Time elapsed is stored as milliseconds. */
    private _finalTime = 0;

    private _startTime?: Date;

    /** An optional callback when the timer stops. */
    private _callback?: () => void;

    /**
     * We use a max time for the timer to avoid it counting "forever".
     * This value is configurable during construction.
     */
    private _maxTime: number;
    private _timerId?: NodeJS.Timeout;
    private _status: TimerStatus;

    constructor(props?: TimerProps) {
        if (props && props.maxTime && typeof props.maxTime === 'number' && !isNaN(props.maxTime)) {
            this._maxTime = props.maxTime;
        } else this._maxTime = 2000;

        this._status = 'Not started';
        this._callback = props?.callback;
    }

    /** Returns the current elapsed time of the timer. Don't use this number for very time-critical use-cases. */
    public get timeElapsed(): number {
        if (!this._startTime) return 0;

        switch (this._status) {
            case 'Started':
                return Math.floor(Date.now() - this._startTime.getTime());
            case 'Stopped':
            case 'Over time':
                return this._finalTime;
            default:
                return 0;
        }
    }

    public get status() {
        return this._status;
    }

    public get maxTime() {
        return this._maxTime;
    }

    public start(): void {
        if (!this._timerId) {
            this._startTime = new Date();
            this._status = 'Started';
            this._timerId = globalThis.setTimeout(() => {
                this._finalTime = this.stop();
                logWarn('A timer has exceeded its max time at ', this._finalTime);
                this._status = 'Over time';
            }, this._maxTime);
        } else {
            throw new Error('A timer is already active.');
        }
    }

    /** Stops the timer.
     * @returns {number} The time elapsed without decimal points.
     */
    public stop(): number {
        this._callback && this._status !== 'Over time' && this._callback();
        if (this._timerId) {
            clearTimeout(this._timerId);
            this._timerId = undefined;
        }
        if (this._startTime) {
            this._finalTime = Date.now() - this._startTime.getTime();
        }
        this._status = 'Stopped';
        return Math.floor(this._finalTime);
    }
}
