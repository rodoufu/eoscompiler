const container = require('./container');
const util = require('./util');

const Wallet = {
    /**
     * Create a wallet.
     * @param name Wallet name.
     * @param callback defautl callback.
     */
    create: (name, callback) => {
        name = name ? `-n ${name}` : "";
        let command = `cleos wallet create ${name} --to-console`;
        container.run('eosNode', command, util.selectStdoutPattern(/\"(\w*)\"/, callback));
    },
    open: (name) => {
    },
    list: () => {
    },
    keys: () => {
    },
    unlock: (name) => {
    },
    /**
     * Create a key on the wallet.
     * @param name Wallet name.
     * @param callback defautl callback.
     */
    createKey: (name, callback) => {
        name = name ? `-n ${name}` : "";
        let command = `cleos wallet create_key ${name}`;
        container.run('eosNode', command, util.selectStdoutPattern(/\"(\w*)\"/, callback));
    },
    import: (name) => {
    }
};

module.exports = Wallet;
