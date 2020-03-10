var express = require('express');
var path = require('path');
var db = require('mysql');
var app = express();
const connect = require('./utils/db')
// set up view engine
// connect.connect();
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));
//
app.get('/',(req,res)=>
{
    res.render('index',
    {
        Title : 'Trang Chủ'
    });
})
var port = 3000;

app.listen(port,()=>
{
    console.log("Server is running");
})