import { logWarn } from '.';

interface TimerProps {
    /** Set a upper threshold for the timer, which will make the timer autostop. Default is 2000 milliseconds. */
    maxTime?: number;
    /** Optional callback. Check the this reference binding as it will default to {Timer} */
    callback?: () => void;
}

type TimerStatus = 'Started' | 'Stopped' | 'Over time' | 'Not started';

export class Timer {
    /** Time elapsed is stored as milliseconds. */
    private _timeElapsed = 0;
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
    }

    public get timeElapsed() {
        return this._timeElapsed;
    }

    public get status() {
        return this._status;
    }

    public start(): void {
        if (!this._timerId) {
            this._startTime = new Date();
            this._status = 'Started';
            this._timerId = globalThis.setTimeout(() => {
                this._timeElapsed = this.stop();
                console.warn('A timer has exceeded its max time at ', this._timeElapsed);
                this._status = 'Over time';
            }, this._maxTime);
        } else logWarn('A timer is already active.');
    }

    /** Stops the timer.
     * @returns {number} The time elapsed without decimal points.
     */
    public stop(): number {
        this._callback instanceof Function && this._callback();
        if (this._timerId) {
            clearTimeout(this._timerId);
            this._timerId = undefined;
        }
        if (this._startTime) {
            this._timeElapsed = Date.now() - this._startTime.getTime();
        }
        this._status = 'Stopped';
        return Math.floor(this._timeElapsed);
    }
}
