var fs = require('fs');
var exec = require('child-process-promise').exec;
var contractsMap = {
    0: 'hello.cpp',
    1: 'addressbook.cpp',
    2: 'addressbook_inline_action.cpp'
};
var util = require('./util');
var compileCodeMock = false;

module.exports = {
    readContract: function (id, callback) {
        fs.readFile('./contracts/' + contractsMap[id], 'utf-8', function (err, data) {
            if (err) throw err;
            callback(util.toBase64(data));
        });
    },
    compileCode: function (data, callback) {
        var respData = {error: null, stderr: null, stdout: null, abi: null};

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
            var tempFolder = './temp/';
            var tempName = "teste";
            fs.writeFile(tempFolder + tempName + ".cpp", util.fromBase64(data), function (err) {
                    if (err) {
                        respData.error = util.toBase64(err);
                        callback(respData);
                    } else {
                        exec('eosio-cpp -o ' + tempFolder + tempName + '.wasm ' + tempFolder + tempName + '.cpp --abigen')
                            .then(function (result) {
                                respData.stdout = util.toBase64(result.stdout);
                                respData.stderr = util.toBase64(result.stderr);

                                fs.readFile(tempFolder + tempName + '.abi', 'utf-8', function (err, data) {
                                    if (err) throw err;
                                    respData.abi = util.toBase64(data);
                                    // fs.readFile(tempFolder + tempName + '.wasm', 'utf-8', function (err, data) {
                                    //     if (err) throw err;
                                    //     respData.wasm = util.toBase64(data);
                                    //     callback(respData);
                                    // });
                                    callback(respData);
                                });
                            })
                            .catch(function (err) {
                                respData.error = util.toBase64(err);
                                callback(respData);
                            });
                    }
                }
            );
        }
    }
};
