const Product = require('../models/product');
const config = require('../config/database');
const Cart = require('../models/cart');
const Order = require('../models/order');
module.exports = (router) => {
//add a item product
router.get('/addcart/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    Product.findById(productId, function (err, product) {
        if(err)
        {
            res.json({ success: false, message: 'faile'});            
        }
        else
        {
        cart.add(product, product.id);
        req.session.cart = cart;
        res.json({ success: true, message: 'buy item success',carts:cart});   
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
    res.json({ success: true, message: 'remove all product success'});
    }
});
router.get('/reduceitem/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.json({ success: true, message: 'you are reduce product!'});
});

router.get('/increaseitem/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.increaseByOne(productId);
    req.session.cart = cart;
    res.json({ success: true, message: 'you are increase product!'});
});

router.get('/removeitem/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.json({ success: true, message: 'you are remove a product to bag shoping!'});
});
router.get('/checkout', function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.json({ success: true, total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/order', function(req, res, next) {
    if (!req.session.cart) {
        res.json({ success: false, message: 'you have not product in bag!'});
    }
    else
    {
    var cart = new Cart(req.session.cart);
        var order = new Order({
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            phone:req.body.phone,
            dateorder:req.body.dateorder,
            status:"process order",
            paymentcard: req.body.paymentcard
        });
        order.save(function(err, result) {
            req.session.cart = null;
            res.json({ success: true, message: 'Successfully bought product!your order Id: '+result._id});
        });
    }
    });

//find all list user
router.get('/listorder', (req, res) => {
    Order.find({}, (err, orders) => {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            if (!orders) {
                res.json({ success: false, message: 'No User found.' });
            } else {
                res.json({ success: true, orders: orders});
            }
        }
    }).sort({ '_id': -1 });
});
//detail order
router.get('/detailorder/:id', (req, res) => {
    // Check if id is present in parameters
    if (!req.params.id) {
      res.json({ success: false, message: 'No order ID was provided.' }); // Return error message
    } else {
      // Check if the blog id is found in database
      Order.findOne({ _id: req.params.id }, (err, orders) => {
        // Check if the id is a valid ID
        if (err) {
          res.json({ success: false, message: 'code bill error, try again!' }); // Return error message
        } else {
          // Check if blog was found by id
          if (!orders) {
            res.json({ success: false, message: 'Orders not found.' }); // Return error message
          } else {
            res.json({ success: true,message: 'Your order!', orders: orders,products: orders.cart.items }); // Return success
          }
        }
      });
    }
  });   
    router.get('/updateorder/:id/:status', function(req, res, next) {
        if (!req.params.id) {
            res.json({ success: false, message: 'no order id' });
        }
        else {
            Order.findById({ _id: req.params.id }, (err, orders) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (!orders) {
                        res.json({ success: false, message: 'false' });
                    }
                    else {
                        orders.status = req.params.status;
                        orders.save((err) => {
                            if (err) {
                                res.json({ success: false, message: 'can not save' });
                            }
                            else {
                                res.json({ success: true, message: 'status for order is '+ orders.status });
                            }
                        });
                    }
                }
            });

        }
        });
    return router;
}