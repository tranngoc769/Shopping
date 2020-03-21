var express = require('express');
var router = express.Router();
var fs = require("fs")
var proModel = require('../../models/admin/product');
var catModel = require('../../models/admin/category');
router.get('/', async (req, res) => {
    var product = await proModel.selectAllPro();
    
    res.render('admin/product',
    {
        product : product
    });
})
router.get('/add', async (req, res) => {
    const allCat = await catModel.selectAllCat();
    res.render('admin/addProduct',
        {
            category: allCat
        });
})
router.get('/edit/:proID', async (req, res) => {
    var proID =  req.params['proID'];
    var product = await proModel.selectProByID(proID);
    const allCat = await catModel.selectAllCat();
    const photos = await proModel.getImage(proID);
    var stringPhoto = ``;
    photos.forEach(element => {
        stringPhoto+= `
        <li file = 'Quang'>
            <img class = 'img-thumb' name = "${element}" src = '../../../photos/${element}' />
            </li>`
    });
    res.render('admin/editProduct',
        {
            category: allCat,
            product : product[0],
            picked : stringPhoto
        });
        
})
router.post('/add', async (req, res) => {
    try {
        var seconds;
        var data = req.body;
        var catID = JSON.parse(data.catID);
        var catName = JSON.parse(data.catName);
        console.log(catName);
        var img = JSON.parse(data.img);
        var imgName = JSON.parse(data.imgName);
        var photoObject = [];
        var value = JSON.parse(data.value);
        for (var i = 0; i < imgName.length; i++) {
            seconds = new Date().getTime();
            var fileName = seconds + '_' + imgName[i];
            photoObject.push(fileName);
            var base64Data = img[i].replace(/^data:image\/png;base64,/, "");
            fs.writeFile('public/photos/' + seconds + '_' + imgName[i], base64Data, 'base64',
                function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                });
        }
        var string = JSON.stringify(photoObject);
        await proModel.addProduct(value.name, value.iPrice, value.oPrice, catID,catName, value.amount, string);

        // const result = await proModel.getImage(4);
        // console.log(result);
        res.send('Thêm sản phẩm thành công');


    }
    catch(ex)
    {
        
        res.send('Thêm sản phẩm không thành công : ' + ex);
    }
})
router.post('/edit/', async (req, res) => {
    try {
        var data = req.body;
        var catID = JSON.parse(data.catID);
        var catName = JSON.parse(data.catName);
        var value = JSON.parse(data.value);
        console.log(value);
        // const result = await proModel.getImage(4);
        // console.log(result);
        const result = await proModel.updateProByID(value.proID,value.name,value.iPrice,value.oPrice,catID,catName,value.amount);
        res.send('Chỉnh sửa sản phẩm thành công');


    }
    catch(ex)
    {
        
        res.send('Chỉnh sửa phẩm không thành công : ' + ex);
    }
})
module.exports = router;