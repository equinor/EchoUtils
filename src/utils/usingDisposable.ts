/**
 * Mimics the c# using IDisposable.
 * Always runs the specified 'thenOnDisposeRunFunc' after main function 'runMainFunc' has finished.
 * UseFull for cleaning up, or to make sure a flagState always are set back to default, even if there are exceptions.
 * @param runMain The main function to run.
 * @param thenDispose The function to always run after the main function.
 */
async function asyncUsing<T>(args: { runMain: () => Promise<T>; thenDispose: () => void }): Promise<T> {
    try {
        return await args.runMain();
    } finally {
        args.thenDispose();
    }
}

/**
 * Mimics the c# using IDisposable.
 * Always runs the specified 'thenOnDisposeRunFunc' after main function 'runMainFunc' has finished.
 * UseFull for cleaning up, or to make sure a flagState always are set back to default, even if there are exceptions.
 * @param runMain The main function to run.
 * @param thenDispose The function to always run after the main function.
 */
function using<T>(args: { runMain: () => T; thenDispose: () => void }): T {
    try {
        return args.runMain();
    } finally {
        args.thenDispose();
    }
}

export const disposable = {
    using,
    asyncUsing
};
