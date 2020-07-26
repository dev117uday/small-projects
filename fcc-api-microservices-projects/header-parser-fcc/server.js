// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const requestIp = require("request-ip");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// inside middleware handler
var ipMiddleware = function (req, res, next) {
  var clientIp = requestIp.getClientIp(req);
  next();
};
//As Connect Middleware
app.use(requestIp.mw())


app.get("/api/whoami", (request, response) => {
  let ipaddress = request.clientIp;
  let language = request.acceptsLanguages();
  let software = request.get("User-Agent");
  response.json({
    ipaddress: ipaddress,
    language: language[0],
    software: software
  });
});

// listen for requests :)
var listener = app.listen(3000 || process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
