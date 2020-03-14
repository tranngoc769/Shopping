var express = require('express');
var router = express.Router();
var catModel = require('../../utils/admin/category');
router.get('/',async(req,res)=>
{
    const object = await catModel.selectAllCat();
    var allCat=JSON.parse(JSON.stringify(object));
   
    // res.render('admin/index');
    res.render('./admin/category',
    {
        Title : 'Danh Mục',
        catList: allCat
    });
})
router.post('/update',async(req,res)=>
{
    var {id,name,fullname,description} = req.body;
    const object = await catModel.updateCatByID(id,name,fullname,description);
    res.send('success');
})
router.post('/delete',async(req,res)=>
{
    var id = req.body.id;
    // const object = await catModel.deleteCatbyID(id);
    
    res.send('success');
})
router.post('/deleteAll',async(req,res)=>
{
    // Parse JSON 2 lan de access array
    var listId = JSON.parse(JSON.parse(JSON.stringify(req.body)).listID);
    listId.forEach( async(element)=> {
        await catModel.deleteCatbyID(element);
    });
    res.send('success');
})
module.exports = router;