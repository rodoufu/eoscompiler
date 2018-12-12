const eosCompiler = angular.module('eosCompiler', []);

function mainController($scope, $http) {
    $scope.formData = {};

    $http.get('/api/todos')
        .success((data) => {
            $scope.todos = data;
            console.log(data);
        })
        .error((data) => {
            console.log('Error: ' + data);
        });

    $scope.createTodo = () => {
        $http.post('/api/todos', $scope.formData)
            .success((data) => {
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);
            })
            .error((data) => {
                console.log('Error: ' + data);
            });
    };

    $scope.deleteTodo = (id) => {
        $http.delete('/api/todos/' + id)
            .success((data) => {
                $scope.todos = data;
                console.log(data);
            })
            .error((data) => {
                console.log('Error: ' + data);
            });
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
                }
            })
            .error((data) => {
                console.log('Error: ' + data);
            });
    };
}
