var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var commandLineArgs = require('command-line-args');
var config = require('./config.json');
var fs = require('fs');

const optionDefinitions = [
    { name: 'port', alias: 'p', type: Number }
];

const options = commandLineArgs(optionDefinitions);

var port = 8989;

if (options.port) {
    port = options.port;
}

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/config', function(req, res) {
    res.send(config);
});

app.put('/config', function(req, res) {
    var json = res.json();
    fs.writeFile('./config.json', JSON.stringify(json), function(err) {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });

});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(port, function () {
    console.log(`ng-hue listening on port ${port}!`);
});
