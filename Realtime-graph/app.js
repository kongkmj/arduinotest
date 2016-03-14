
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  path = require('path'),
  errorHandler = require('errorhandler');


var app = module.exports = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var pushdata = [
  {

  labels:['0','1','2','3','4'],
  series:['a'],
  data:[
    [0]
  ]}
];



/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(morgan('dev'));
app.use(bodyParser()); // pull information from html in POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.use(errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)

app.get('/pushdata', function (req, res) {
  'use strict';
  console.log(pushdata);


  res.send(pushdata);
});

app.post('/pushdata', jsonParser, function (req, res) {
  'use strict';
var b =0;
  if (!req.body) {
    return res.sendStatus(400);
  }

  pushdata[0].data[0].push(req.body.data[0]);
  //pushdata[0].data[1].push(req.body.data[1]);
  pushdata[0].labels.push(req.body.label);



  io.emit('datainput', req.body);
  return res.sendStatus(200);
});


/**
 * Start Server
 */

http.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
