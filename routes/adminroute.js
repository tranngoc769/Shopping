var express = require('express');
var router = express.Router();
router.get('/',(req,res)=>
{
    // res.render('admin/index');
    res.send('admin area');
})

// router.get('/add-page',(req,res)=>
// {
//     res.render('admin/add-page',
//     {
//         Title : 'Thêm Trang',
//         title :'title',
//         slug : 'slug',
//         type : 'type',
//         content : 'content'

//     });
// });


module.exports  = router;