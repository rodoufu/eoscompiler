module.exports = {
    toBase64: (data)=> {
        return Buffer.from(data).toString('base64');
    },
    fromBase64: (data)=> {
        return Buffer.from(data, 'base64').toString();
    }
};
