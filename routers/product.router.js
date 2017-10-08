const Product = require('../models/product');
const config = require('../config/database');
var fs = require('fs');
module.exports = (router) => {
    router.post('/createproduct', (req, res) => {
        if(!req.body.path)
        {
            res.json({ success: false, message: 'no find path' }); // Return error
        }
        else
        {
        var newProduct = new Product();
        newProduct.image.data = fs.readFileSync(req.body.path);
        newProduct.image.contentType = 'image/png';
        newProduct.save((err,products)=>{
            if(err)
            {
                res.json({ success: false, message: 'No save' }); // Return error
            }
            else{
                res.json({ success: true, message: 'save' }); // Return error
            }
        });
    }
    });
    router.get('/listproduct', function (req, res, next) {
        Product.find( function (err, doc) {
          if (err) return next(err);
          res.contentType(doc.img.contentType);
          res.send(doc.img.data);
        });
      });
    return router;
}