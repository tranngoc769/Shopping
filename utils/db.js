const mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'ecommerce'
});
function connect()
{
    conn.connect(function (err){
        if (err) throw err.stack;
        console.log('Connection success');
    });
}
function end()
{
    conn.end(function (err){
        if (err) throw err.stack;
        console.log('End connection success');
    });
}
async function querry (sql){
    return new Promise((resolve, reject) => {
        conn.query(sql, (error, results, fields) => {
            if (error) {
                console.log(error)
                reject(error);
            }
            resolve(results);
        });
    });
};

module.exports = 
{
    end,
    connect,
    querry
}