const fs = require('fs');
const contractsMap = {
    0: 'hello.cpp',
    1: 'addressbook.cpp',
    2: 'addressbook_inline_action.cpp'
};
const util = require('./util');
const container = require('./container');
// EOSIO_DISPATCH( addressbook, (upsert)(erase))
const dispatchPattern = /EOSIO_DISPATCH\(\s*(\w*)\s*,?\s*([\(\)\w]*)\)/;

const Contract = {
    /**
     * Get a contract from the server.
     * @param id The contratc id.
     * @param callback Defaul callback.
     */
    readContract: (id, callback) => {
        fs.readFile(`./contracts/${contractsMap[id]}`, 'utf-8', (err, data) => {
            if (err) throw err;
            callback(util.toBase64(data));
        });
    },
    /**
     * Find the contract name on a string.
     * @param data The string to look for the contract name.
     * @returns {*} The contract name.
     */
    getContractName: (data) => {
        if (data.match(dispatchPattern)) {
            const match = dispatchPattern.exec(data);
            return match[1];
        } else {
            return null;
        }
    },
    /**
     * Find the contrat methods on a string.
     * @param data The string to look for the contract methods.
     * @returns {*} The contrat methods.
     */
    getContractMethods: (data) => {
        const methodPattern = /\(\s*(\w*)\)/g;
        if (data.match(dispatchPattern)) {
            const match = dispatchPattern.exec(data);
            let methods = match[2].match(methodPattern);
            let resp = [];

            for (let i = 0; i < methods.length; i++) {
                resp.push(methods[i].substr(1, methods[i].length - 2));
            }
            return resp;
        } else {
            return null;
        }
    },
    /**
     * Compile a contract.
     * @param data The contract to be compiled.
     * @param callback Default callback;
     */
    compileCode: (data, callback) => {
        const fileName = Contract.getContractName(data);
        if (fileName) {
            let command = `./compile.sh ${fileName} ${util.toBase64(data)}`;
            container.run('eosCompiler', command, (result) => {
                if (result.stderr) {
                    callback(result.stderr);
                } else {
                    callback(null, JSON.parse(util.fromBase64(result.stdout)));
                }
            });
        }
    }
};

module.exports = Contract;
