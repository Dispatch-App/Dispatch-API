var routes = require('./routes');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(routes);

app.listen(process.env.PORT || 3000);
