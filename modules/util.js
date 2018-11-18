module.exports = {
    toBase64: function (data) {
        return Buffer.from(data).toString('base64');
    },
    fromBase64: function (data) {
        return Buffer.from(data, 'base64').toString();
    }
};
