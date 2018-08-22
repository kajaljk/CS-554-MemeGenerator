const express = require('express'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      cors = require('cors'),
      errorhandler = require('errorhandler'),
      mongoose = require('mongoose'),
      steam   = require('steam-login'); 

const app = express();

app.use(cors());
 
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'a secret' }));

app.use(require('method-override')());
app.use('/images',express.static(__dirname + '/public/images'));

app.use(session({ secret: 'memegenerator', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));
 
app.use(errorhandler());
 
mongoose.connect('mongodb://localhost/memegenerator'); 
mongoose.set('debug', true);
 
require('./models/User');
require('./models/Meme');
require('./config/passport'); 

app.get('/public/images/:imgName', function(req, res) {
  let imgPath = req.params.imgName;
  console.log("Img:"+imgPath);
  res.sendFile(__dirname+'/public/images/'+imgPath);
});

app.get('/', function(req, res) {
    res.send(req.user == null ? 'not logged in' : 'hello ' + req.user.username).end();
});
 
app.get('/logout', steam.enforceLogin('/'), function(req, res) {
    req.logout();
    res.redirect('/');
});

app.use(require('./routes'));


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers 
app.use(function(err, req, res, next) {
  console.log(err.stack); 
  res.status(err.status || 500); 
  res.json({'errors': {
    message: err.message,
    error: err
  }});
}); 

var server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});
