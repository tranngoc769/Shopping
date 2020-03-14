var express = require('express');
var router = express.Router();
router.get('/',(req,res)=>
{
    // res.render('admin/index');
    res.render('./admin/category',
    {
        Title : 'Danh Mục'
    });
})
module.exports = router;