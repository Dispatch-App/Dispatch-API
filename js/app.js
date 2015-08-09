var routes = require('./routes'),
	express = require('express'),
	bodyParser = require('body-parser'),
	fs = require('fs'),
	https = require('https'),
	http = require("http"),
	crypto = require('crypto'),
	morgan = require('morgan'),
	app = express(),
	port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(routes);

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

//http.createServer(app).listen(80);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);

// app.listen(process.env.PORT || 3000);
