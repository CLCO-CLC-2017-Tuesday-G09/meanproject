const Catalog = require('../models/catalog');
const Branch = require('../models/branch');
const Product = require('../models/product');
const config = require('../config/database');
const session = require('express-session');
const Cart = require('../models/cart');
module.exports = (router) => {
//add a item product
router.get('/addcart/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart.items : {});
    
    Product.findById(productId, function (err, product) {
        if(err)
        {
            res.json({ success: false, message: 'faile'});            
        }
        else
        {
        cart.add(product, product.id);
        req.session.cart = cart;
        res.json({ success: true, message: 'success',carts:cart});   
        }
    });
});

router.get('/shoppingcart', function (req, res, next) {
    if (!req.session.cart) {
        res.json({ success: false, message: 'no session',products:null });
    }
    else
    {
    var cart = new Cart(req.session.cart);
    res.json({ success: true, message: 'success', products: cart.generateArray(), totalPrice: cart.totalPrice});
    }
});

router.get('/removecart', function (req, res, next) {
    if (!req.session.cart) {
        res.json({ success: false, message: 'no session' });
    }
    if(req.session.cart.items===undefined)
    {
        res.json({ success: false, message: 'no items' });
    }
    else
    {
    req.session.destroy();
    res.json({ success: true, message: 'success'});
    }
});

router.get('/removeitem/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.json({ success: true, message: 'success'});
});
    return router;
}