var eosCompiler = angular.module('eosCompiler', []);

function mainController($scope, $http) {
    $scope.formData = {};

    $http.get('/api/todos')
        .success(function (data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    $scope.createTodo = function () {
        $http.post('/api/todos', $scope.formData)
            .success(function (data) {
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.deleteTodo = function (id) {
        $http.delete('/api/todos/' + id)
            .success(function (data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.compileCode = function () {
        $http.post('/api/contract/compileCode', {"text": btoa(editor.getValue())})
            .success(function (data) {
                $('#output').val(atob(data.stderr) + '\n' + atob(data.stdout));
                $('#abi').text(atob(data.abi));
                hljs.highlightBlock($('#abi'));
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
}
