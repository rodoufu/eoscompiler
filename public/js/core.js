const eosCompiler = angular.module('eosCompiler', []);

function mainController($scope, $http) {
    $scope.contractsMap = {
        0: 'Hello World',
        1: 'AddressBook',
        2: 'AddressBook inline action'
    };
    $scope.formData = {};

    $scope.getContractText = (id) => {
        if (!isNaN(id)) {
            $.get('/api/contract/' + id, (data) => {
                editor.setValue(atob(data), -1);
            });
        }
    };

    $scope.compileCode = () => {
        $http.post('/api/contract/compileCode', {"text": btoa(editor.getValue())})
            .success((data) => {
                if (data.stderr) {
                    $('#output').val(atob(data.stderr));
                }
                if (data.stdout) {
                    $('#output').val(atob(data.stdout));
                }
                if (data.error) {
                    $('#output').val(atob(data.error));
                }
                if (data.abi) {
                    let abiPlace = $('#abi');
                    $(abiPlace).empty();
                    $(abiPlace).text(atob(data.abi));
                    // hljs.highlightBlock(abiPlace);
                    $('#abiRow').removeClass('hidden');
                }
                if (data.wasm) {
                    let wasmPlace = $('#wasm');
                    $(wasmPlace).empty();
                    $(wasmPlace).text(atob(data.wasm));
                    // hljs.highlightBlock(abiPlace);
                    $('#wasmRow').removeClass('hidden');
                }
            })
            .error((data) => {
                console.log('Error: ' + data);
            });
    };

    $scope.downloadText = (filename, text, filetype) => {
        let aTempLink = window.document.createElement('a');
        aTempLink.href = window.URL.createObjectURL(new Blob([text], {type: filetype ? filetype : 'text/plain'}));
        aTempLink.download = filename;

        document.body.appendChild(aTempLink);
        aTempLink.click();

        document.body.removeChild(aTempLink);
    };

    $scope.downloadCode = () => {
        $scope.downloadText('smartcontract.cpp', editor.getValue());
    };

    $scope.downloadAbi = () => {
        $scope.downloadText('smartcontract.abi', jQuery('#abi').text());
    };

    $scope.downloadWasm = () => {
        $scope.downloadText('smartcontract.wasm', jQuery('#wasm').text(), 'application/octet-stream');
    };
}
