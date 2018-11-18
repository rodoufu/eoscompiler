var express = require('express');
var app = express();
// var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Configuration
// mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());


var todos = [{"text": "123"}, {"text": 'oi'}, {"text": "1"}, {"text": 'ola'}];

app.get('/api/todos', function (req, res) {
    res.json(todos);
});

app.post('/api/todos/', function (req, res) {
    var text = req.body.text;
    console.log("Selected id to save: " + text);
    todos.push({"text": text});
    res.json(todos);
});

app.delete('/api/todos/:todo_id', function (req, res) {
    var id = req.params.todo_id;
    console.log("Selected id to delete: " + id);
    res.json(todos);
});

var contracts = require('./modules/contracts');
app.get('/api/contract/:contract_id', function (req, res) {
    contracts.readContract(req.params.contract_id, function (data) {
        res.send(data);
    });
});

var util = require('./modules/util');
app.post('/api/contract/compileCode', function (req, res) {
    contracts.compileCode(util.fromBase64(req.body.text), function (data) {
        res.send(data);
    });
});

// app.get('*', function (req, res) {
//     res.sendFile('./public/index.html');
// });

app.listen(8080);
console.log("EOS.IO compiler is running!");
