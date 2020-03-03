var express = require('express');
var path = require('path');

var app = express();

// set up view engine

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));
//
app.get('/',(req,res)=>
{
    res.send('Running');
})
var port = 3000;

app.listen(port,()=>
{
    console.log("Server is running");
})