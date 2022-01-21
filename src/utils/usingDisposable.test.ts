import { disposable } from './usingDisposable';

describe('asyncUsing', () => {
    it('should run dispose function after main function', async () => {
        let isLoading = true;
        expect(isLoading).toBe(true);
        await disposable.asyncUsing({
            runMain: async () => {
                await Promise.resolve();
            },
            thenDispose: () => {
                isLoading = false;
            }
        });
        expect(isLoading).toBe(false);
    });

    it('should run dispose function after exception is thrown in main', async () => {
        let isLoading = true;
        expect(isLoading).toBe(true);
        try {
            await disposable.asyncUsing({
                runMain: async () => {
                    await Promise.resolve();
                    throwError();
                },
                thenDispose: () => {
                    isLoading = false;
                }
            });
        } catch {}
        expect(isLoading).toBe(false);
    });
});

describe('using', () => {
    it('should run dispose function after main function', () => {
        let isLoading = true;
        expect(isLoading).toBe(true);
        let mainResult = 0;
        mainResult = disposable.using({
            runMain: () => {
                return 5;
            },
            thenDispose: () => {
                isLoading = false;
            }
        });
        expect(mainResult).toBe(5);
        expect(isLoading).toBe(false);
    });

    it('should run dispose function after exception is thrown in main', () => {
        let isLoading = true;
        let mainResult = 0;
        expect(isLoading).toBe(true);
        try {
            mainResult = disposable.using({
                runMain: () => {
                    throwError();
                    return 5;
                },
                thenDispose: () => {
                    isLoading = false;
                }
            });
        } catch {}
        expect(mainResult).toBe(0);
        expect(isLoading).toBe(false);
    });
});

function throwError(): void {
    throw new Error('test');
}
