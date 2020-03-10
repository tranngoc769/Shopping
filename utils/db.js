const mysql = require('mysql');

function connectToSring() {
    return mysql.createConnection({
        host: '45.252.248.16',
        port: '3306',
        user: 'vesinhv1',
        password: 'tranngoc7699',
        database: 'vesinhv1_shop'
    });
}
exports.connect = sql => {
    return new Promise((resolve, reject) => {
        const con = connectToSring();
        con.connect(err => {
            if (err) {
                reject(err);
            }
            console.log("Connected!");
        });
    });
};

