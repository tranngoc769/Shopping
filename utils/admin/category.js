var connection = require('../db');

module.exports = {
    selectAllCat: async () => {
        var sql = "SELECT * FROM category";
        const rows = await connection.querry(sql);
        return rows;
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

}