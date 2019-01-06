const fs = require('fs');
const exec = require('child-process-promise').exec;
const contractsMap = {
    0: 'hello.cpp',
    1: 'addressbook.cpp',
    2: 'addressbook_inline_action.cpp'
};
const util = require('./util');
// EOSIO_DISPATCH( addressbook, (upsert)(erase))
const dispatchPattern = /EOSIO_DISPATCH\(\s*(\w*)\s*,?\s*([\(\)\w]*)\)/;

module.exports = {
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
        const methodPattern = /\(\s*(\w*)\)/;
        if (data.match(dispatchPattern)) {
            const match = dispatchPattern.exec(data);
            let str = match[2];
            let methods = [];
            let m;
            while ((m = methodPattern.exec(str)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === methodPattern.lastIndex) {
                    methodPattern.lastIndex++;
                }

                // The result can be accessed through the `m`-variable.
                m.forEach((match, groupIndex) => {
                    methods.push(match);
                });
            }
            return methods;
        } else {
            return null;
        }
    },
    compileCode: (data, callback) => {
        let respData = {error: null, stderr: null, stdout: null, abi: null};
        // 'docker run --rm -w /home/eoscompiler/ eoscompiler:0.0.1 ./compile.sh ' + util.toBase64(data)
        const fileName = getContractName(data);
        if (fileName != null) {
            exec(`docker-compose run eosCompiler ./compile.sh ${fileName} ${util.toBase64(data)}`)
                .then((result) => {
                    let resp = JSON.parse(util.fromBase64(result.stdout));
                    // console.log(resp);
                    callback(resp);
                })
                .catch((err) => {
                    if (err) {
                        respData.error = util.toBase64(err.message);
                        callback(respData);
                    }
                    callback();
                });
        }
    }
};
