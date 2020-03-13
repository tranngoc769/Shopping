/* DECLASRE */
var express = require('express');
var path = require('path');
var db = require('mysql');
var app = express();
const connect = require('./utils/db')
var bodyParser = require("body-parser");
var session = require('express-session');
var validator = require('express-validator');
/* @@END DECLASRE */

/* CONNECT DATABASE */
// connect.connect();
/* @@END CONNECT DATABASE */

/* SESSION */
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
/* @@END SESSION */

/* MESSAGES */
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
/* @@END MESSAGES */

// VIEWS ENGINE
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, '/public')));
/* @@END VIEWS ENGINE */

/* BODY_PARSER */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
/* END @@BODY_PARSER */

/* VALIDATOR */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
/* END @@VALIDATOR */

/* ROUTE */
var router = require('./routes/route');
app.use('/', router);
var adminrouter = require('./routes/adminroute');
app.use('/admin', adminrouter);
/* @@END ROUTE */



// START SERVER
var port = 3000;
app.listen(port,()=>
{
    console.log("Server is running");
})