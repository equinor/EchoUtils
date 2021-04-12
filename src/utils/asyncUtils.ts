/**
 *
 * Function which fires an async function without 'await'.
 * This makes it clear that we do not wish to use 'await' for this particular
 * async function.
 * @param {() => Promise<void>} asyncFunc The async function to be called.
 */
export function fireAndForget(asyncFunc: () => Promise<void>): void {
    asyncFunc();
}
