var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var fs = require('fs');
var https = require('https');

var privatekey = fs.readFileSync('/etc/letsencrypt/live/vultr.schoneveld.com/privkey.pem');
var certificate = fs.readFileSync('/etc/letsencrypt/live/vultr.schoneveld.com/cert.pem');
var credentials = {key: privatekey, cert: certificate};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var routes = require("./routes/routes.js")(app);

var server = app.listen(3000, '0.0.0.0',function () {
    console.log("Listening on port %s...", server.address().port);
});

// create a secure server using the priv key etc 
// created above
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(3443,function() {console.log("Listening on secure port 3443 ...")});
