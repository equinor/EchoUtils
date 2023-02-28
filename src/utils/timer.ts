interface TimerProps {
    maxTime?: number;
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
    private _maxTime = 2000;
    private _timerId?: NodeJS.Timeout;
    private _status: TimerStatus;

    constructor(props?: TimerProps) {
        if (typeof props?.maxTime === 'number') this._maxTime = props.maxTime;
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
                this._callback && this._callback();
                this._status = 'Over time';
            }, this._maxTime);
        } else console.info('A timer is already active.');
    }

    /** Stops the timer.
     * @returns {number} The time elapsed without decimal points.
     */
    public stop(): number {
        this._callback && this._callback();
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
