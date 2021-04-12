import { RefObject } from 'react';

export interface Options {
    refs?: RefObject<HTMLElement>[];
    disabled?: boolean;
    eventTypes?: string[];
    excludeScrollbar?: boolean;
    ignoreClass?: string;
    detectIFrame?: boolean;
}

export interface Callback<T extends Event = Event> {
    (event: T): void;
}

export interface Return {
    (element: HTMLElement | null): void;
}
