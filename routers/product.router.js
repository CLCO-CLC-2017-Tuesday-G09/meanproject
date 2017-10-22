const Product = require('../models/product');
const Branch = require('../models/branch');
const Catalog = require('../models/catalog');
const config = require('../config/database');
var fs = require('fs');
var async = require('async');
request = require('request');
module.exports = (router) => {
    router.post('/createproduct', (req, res) => {
        if (!req.body.nameproduct || !req.body.description || !req.body.price || !req.body.image||!req.body.size||!req.body.color||!req.body.idcatalog) {
            res.json({ success: false, message: 'you must enter input' });
        }
        else {
            const filename = req.body.image;
            var GoogleTokenProvider = require('refresh-token').GoogleTokenProvider;
            
            const CLIENT_ID = '360407678538-ts6k1eceunflqbd5433kr9pt7o6agekd.apps.googleusercontent.com';
            const CLIENT_SECRET = 'LsfkQResnQY9rWEj_L9rC1Nv';
            const REFRESH_TOKEN = '1/7NHKOwX2AHxJ_Z4rhuz31NRQps20uUbGflvxn1yAqEc';
            const ENDPOINT_OF_GDRIVE = 'https://www.googleapis.com/drive/v2';
            const PARENT_FOLDER_ID = '0B8sFb7bO0YNiUjZiOFVGN00tdkU';
            const PNG_FILE = filename;
            async.waterfall([
                //-----------------------------
                // Obtain a new access token
                //-----------------------------
                function(callback) {
                  var tokenProvider = new GoogleTokenProvider({
                    'refresh_token': REFRESH_TOKEN,
                    'client_id': CLIENT_ID,
                    'client_secret': CLIENT_SECRET
                  });
                  tokenProvider.getToken(callback);
                },
              
                function(accessToken, callback) {
                  
                  var fstatus = fs.statSync(PNG_FILE);
                  fs.open(PNG_FILE, 'r', function(status, fileDescripter) {
                    if (status) {
                      callback(status.message);
                      return;
                    }
                    
                    var buffer = new Buffer(fstatus.size);
                    fs.read(fileDescripter, buffer, 0, fstatus.size, 0, function(err, num) {
                        
                      request.post({
                        'url': 'https://www.googleapis.com/upload/drive/v2/files',
                        'qs': {
                           //request module adds "boundary" and "Content-Length" automatically.
                          'uploadType': 'multipart'
              
                        },
                        'headers' : {
                          'Authorization': 'Bearer ' + accessToken
                        },
                        'multipart':  [
                          {
                            'Content-Type': 'application/json; charset=UTF-8',
                            'body': JSON.stringify({
                               'title': PNG_FILE,
                               'parents': [
                                 {
                                   'id': PARENT_FOLDER_ID
                                 }
                               ]
                             })
                          },
                          {
                            'Content-Type': 'image/png',
                            'body': buffer
                          }
                        ]
                      }, callback);
                      
                    });
                  });
                },
                //----------------------------
                // Parse the response
                //----------------------------
                function(response, body, callback) {
                  var body = JSON.parse(body);
                  callback(null, body);
                },
              
              ], function(err, results) {
                if (!err) {
                    let product = new Product({
                        nameproduct: req.body.nameproduct,
                        description: req.body.description,
                        price: req.body.price,
                        image: results.id,
                        color: req.body.color,
                        size: req.body.size,
                        idcatalog: req.body.idcatalog
                    });
                    
            product.save((err, result) => {
                if (err) {
                    if (err.code === 11000) {
                        res.json({ success: false, message: 'Username or e-mail allready exists' });
                    }
                    else {
                        if (err.errors) {
                            res.json({ success: false, message: err.message });
                            
                        }
                        else {
                            res.json({ success: false, message: 'Could not save user. Error: ', err });
                        }
                    }
                }
                else {
                   //this id from Method Post
                   var idcatalog = req.body.idcatalog;
                   //find id of branch and update field branchs of collection menu
                   Catalog.findByIdAndUpdate(idcatalog,
                       { "$push": { "products": result } },
                       { "new": true, "upsert": true }, function (err, data) {
                           if (err) {
                               res.json(err);
                           } else {
                               //update filed idMenu in Menu
                               Product.findByIdAndUpdate(result._id,
                                   { $set: { idcatalog: idcatalog } }, { new: true },
                                   function (err, dataNew) {
                                       if (err) {
                                           res.json(err);
                                       } else {
                                           res.json({ success: true,message: 'Add success',message: dataNew })
                                       }

                                   });
                           }

                       });
        }
    });
        }
    });
}
    });     
    //get all product
    router.get('/getallproducts', (req, res) => {
        // Search database for all blog posts
        Product.find({}, (err, product) => {
          // Check if error was found or not
          if (err) {
            res.json({ success: false, message: err }); // Return error message
          } else {
            // Check if blogs were found in database
            if (!product) {
              res.json({ success: false, message: 'No products found.' }); // Return error of no blogs found
            } else {
              res.json({ success: true, product: product }); // Return success and blogs array
            }
          }
        }).sort({ '_id': -1 }); // Sort blogs from newest to oldest
      });
      //update product
      router.put('/updateProduct', (req, res) => {
        // Check if id was provided
        if (!req.body._id) {
          res.json({ success: false, message: 'No product id provided' }); // Return error message
        } else {
          // Check if id exists in database
          Product.findOne({ _id: req.body._id }, (err, product) => {
            // Check if id is a valid ID
            if (err) {
              res.json({ success: false, message: 'Not a valid product id' }); // Return error message
            } else {
              // Check if id was found in the database
              if (!product) {
                res.json({ success: false, message: 'product id was not found.' }); // Return error message
              } else { 
                        product.nameproduct = req.body.nameproduct; // Save latest blog title
                        product.description = req.body.description;
                        product.price = req.body.price;
                        product.size = req.body.size;
                        product.idcatalog = req.body.idcatalog;
                        product.color = req.body.color;
                        product.save((err) => {
                          if (err) {
                            if (err.errors) {
                              res.json({ success: false, message: 'Please ensure form is filled out properly' });
                            } else {
                              res.json({ success: false, message: err }); // Return error message
                            }
                          } else {
                            res.json({ success: true, message: 'Product Updated!' }); // Return success message
                          }
                        });          
              }
            }
          });
        }
      });
//delete product
router.delete('/deleteproduct/:id', function (req, res) {
    if (!req.params._id) {
        res.json({ success: false, message: req.params._id });
    }
    else {
        Product.findOneAndRemove({ _id: req.params._id }, (err, product) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                if (!product) {
                    res.json({ success: false, message: 'can not found product' });
                }
                else {
                    //res.json({ success: true, message: catalog });

                    Catalog.findOne({ _id: catalog.idcatalog }, (error, catalog) => {
                        if (error) {
                            res.json({ success: false, message: error });
                        } else {

                            //when update catalog successfully
                            Catalog.findOneAndUpdate({ _id: catalog._id },
                                { $pull: { products: product._id } }, function (err, data) {
                                    if (err) {
                                        res.json({ success: false, message: err });
                                    } else {
                                        res.json({ success: true, data: data });
                                    }
                                });
                        }
                    });
                }
            }
        });
    }
  });
//search product
router.get('/searchproduct/:nameproduct', (req, res) => {
    
            //find with products
            Product.find({ nameproduct: {'$regex': req.params.nameproduct} }, (err, products) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (!products || products=="") {
                        res.json({ success: true, message: "can not found" });
                    } else {
                        res.json({ success: true, message: "find success", products: products });
    
                    }
                }
            });
        });
    //fillter
  //find all product of one catalog
  router.get('/listproduct/:idcatalog', (req, res) => {
    //res.json({ success: false, message: req.params.branchName });
    Catalog.find({_id: req.params.idcatalog}, (err, catalog) => {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            if (!catalog) {
                res.json({ success: false, message: 'No menu found.' });
            } else {
                Product.find({idcatalog: catalog[0]['_id']}, (err, products) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        if (!products) {
                            res.json({ success: false, message: 'No catalog found.' });
                        } else {
                            res.json({ success: true,message:catalog[0]['_id'], products: products });
        
                        }
                    }
                });

            }
        }
    })
});

     //search
     router.get('/search/:namesearch', (req, res) => {
        
                //find with products
                Product.find({ nameproduct: {'$regex': req.params.namesearch} }, (err, products) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        if (!products || products=="") {
                            //find with catalogs
                            Catalog.find({ catalogName: {'$regex': '.*'+req.params.namesearch+'.*'} }, (err, catalogs) => {
                                if (err) {
                                    res.json({ success: false, message: err });
                                } else {
                                    if (!catalogs||catalogs=="") {
                                        //find with branchs
                                        Branch.find({ branchName: {'$regex': req.params.namesearch} }, (err, branches) => {
                                            if (err) {
                                                res.json({ success: false, message: err });
                                            } else {
                                                if (!branches) {
                                                    res.json({ success: false, message: 'No branchs found.' });
                                                } else {
                                                    res.json({ success: true, message: "find success", branches: branches });
        
                                                }
                                            }
                                        });
                                    } else {
                                        res.json({ success: true, message: "find success", catalogs: catalogs });
        
                                    }
                                }
                            });
                        } else {
                            res.json({ success: true, message: "find success", products: products });
        
                        }
                    }
                });
        
        
            });
        
    return router;
}