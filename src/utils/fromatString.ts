export function formatString( ...args: (string | undefined)[] ): string {
    const strings = args.filter(arg  => arg !== undefined);
    if (strings.length > 0) {
        return strings.join("-")
    }
    return "-"
}