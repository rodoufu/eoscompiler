const express = require('express');
const app = express();
// var mongoose = require('mongoose');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Configuration
// mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');

app.use(express.static(`${__dirname}/public`));
// app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

const contracts = require('./modules/contract');
app.get('/api/contract/:contract_id', (req, res) => {
    contracts.readContract(req.params.contract_id, (data) => {
        res.send(data);
    });
});

const util = require('./modules/util');
app.post('/api/contract/compileCode', (req, res) => {
    contracts.compileCode(util.fromBase64(req.body.text), (err, data) => {
        if (!err) {
            res.send(data);
        }
    });
});

// app.get('*', (req, res) => {
//     res.sendFile('./public/index.html');
// });

app.listen(8080);
console.log("EOS.IO compiler is running!");
