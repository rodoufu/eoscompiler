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
    readContract: (id, callback) => {
        fs.readFile(`./contracts/${contractsMap[id]}`, 'utf-8', (err, data) => {
            if (err) throw err;
            callback(util.toBase64(data));
        });
    },
    getContractName: (data) => {
        if (data.match(dispatchPattern)) {
            const match = dispatchPattern.exec(data);
            return match[1];
        } else {
            return null;
        }
    },
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
