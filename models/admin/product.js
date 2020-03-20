var connection = require('../../utils/db');

module.exports = {
    selectAllPro: async () => {
        var sql = "SELECT * FROM product";
        const rows = await connection.querry(sql);
        return JSON.parse(JSON.stringify(rows));
    },
    selectProByID: async (id) => {
        var sql = `SELECT * FROM product where id = ${id}`;
        const rows = await connection.querry(sql);
        return JSON.parse(JSON.stringify(rows));
    },
    // updateCatByID : async (id,name,fullname,description) =>{
    //     var sql = `UPDATE category SET  name = '${name}',fullname = '${fullname}',description='${description}' WHERE id = ${id}`;
    //     const rows = await connection.querry(sql);
    //     // console.log(sql);
    // },
    // deleteCatbyID : async (id) =>{
    //     var sql = `DELETE FROM category WHERE id = ${id}`;
    //     const rows = await connection.querry(sql);
    //     // console.log(sql);
    // },
    addProduct : async (name,inPrice,sellPrice,category,catName,amount,photo) =>{
        var sql =  `INSERT INTO product(name,inPrice,sellPrice,category,catName,amount,photo) VALUES ("${name}",${inPrice},${sellPrice},${category},'${catName}',${amount},'${photo}')`;
        const rows = await connection.querry(sql);
    },
    getImage : async (id) =>{
        var sql =  `SELECT photo FROM product where id = ${id}`;
        const rows = await connection.querry(sql);
        var photo = JSON.parse(JSON.stringify(rows));
        return JSON.parse(photo[0].photo);
        
    }
    
}