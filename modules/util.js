module.exports = {
    /**
     * Convert a string to base 64.
     * @param data String to be converted into base 64.
     * @returns {*} The converted string in base 64.
     */
    toBase64: (data) => {
        return Buffer.from(data).toString('base64');
    },
    /**
     * Convert a base 64 string back to the original.
     * @param data The base 64 string.
     * @returns {*} The original value.
     */
    fromBase64: (data) => {
        return Buffer.from(data, 'base64').toString();
    },
    /**
     * Treat a callback and looks for the regex pattern on the output.
     * @param pattern Regex pattern.
     * @param callback Default callback.
     * @returns {Function} Function to threat the values.
     */
    selectStdoutPattern: (pattern, callback) => {
        return (result) => {
            if (result.stderr) {
                callback(result.stderr);
            } else {
                if (result.stdout.match(pattern)) {
                    const match = pattern.exec(result.stdout);
                    callback(null, match[1]);
                } else {
                    callback(result.stdout);
                }
            }
        }
    }
};
