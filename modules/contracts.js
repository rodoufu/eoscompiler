const fs = require('fs');
const randomstring = require('randomstring');
const exec = require('child-process-promise').exec;
const contractsMap = {
    0: 'hello.cpp',
    1: 'addressbook.cpp',
    2: 'addressbook_inline_action.cpp'
};
const util = require('./util');
let compileCodeMock = false;

module.exports = {
    readContract: (id, callback) => {
        fs.readFile(`./contracts/${contractsMap[id]}`, 'utf-8', (err, data) => {
            if (err) throw err;
            callback(util.toBase64(data));
        });
    },
    compileCode: (data, callback) => {
        let respData = {error: null, stderr: null, stdout: null, abi: null};

        if (compileCodeMock) {
            switch (Math.floor(Math.random() * 10) % 5) {
                case 4:
                    respData.error = util.toBase64("Could not found the compiler.");
                    break;
                case 3:
                    respData.stderr = util.toBase64("File not found.");
                    respData.stdout = util.toBase64("");
                    break;
                default:
                    respData.stderr = util.toBase64("");
                    respData.stdout = util.toBase64("");
                    respData.abi = util.toBase64('{"types": []}');
                    break;
            }
        } else {
            // 'docker run --rm -w /home/eoscompiler/ eoscompiler:0.0.1 ./compile.sh ' + util.toBase64(data)
            exec(`docker-compose run eosCompiler ./compile.sh ${randomstring.generate(10)} ${util.toBase64(data)}`)
                .then((result) => {
                    console.log(result.stdout);
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
