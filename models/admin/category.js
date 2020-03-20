var connection = require('../../utils/db');

module.exports = {
    selectAllCat: async () => {
        var sql = "SELECT * FROM category";
        const rows = await connection.querry(sql);
        return JSON.parse(JSON.stringify(rows));
    },
    selectCatbyID: async (id) => {
        var sql = `SELECT * FROM category where id = ${id}`;
        const rows = await connection.querry(sql);
        return JSON.parse(JSON.stringify(rows));
    },
    updateCatByID : async (id,name,fullname,description) =>{
        var sql = `UPDATE category SET  name = '${name}',fullname = '${fullname}',description='${description}' WHERE id = ${id}`;
        const rows = await connection.querry(sql);
        // console.log(sql);
    },
    deleteCatbyID : async (id) =>{
        var sql = `DELETE FROM category WHERE id = ${id}`;
        const rows = await connection.querry(sql);
        // console.log(sql);
    },
    addCat : async (name,fname,des) =>{
        var sql =  `INSERT INTO category (name,fullname,description) VALUES ('${name}','${fname}','${des}')`;
        const rows = await connection.querry(sql);
        // console.log(sql);
    },
}