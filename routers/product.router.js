const Product = require('../models/product');
const Branch = require('../models/branch');
const Catalog = require('../models/catalog');
const config = require('../config/database');
var fs = require('fs');
var async = require('async');
request = require('request');
module.exports = (router) => {
    router.post('/createproduct', (req, res) => {
        if (!req.body.nameproduct || !req.body.description || !req.body.price || !req.body.image ||!req.body.color||!req.body.size) {
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
                function (callback) {
                    var tokenProvider = new GoogleTokenProvider({
                        'refresh_token': REFRESH_TOKEN,
                        'client_id': CLIENT_ID,
                        'client_secret': CLIENT_SECRET
                    });
                    tokenProvider.getToken(callback);
                },

                function (accessToken, callback) {

                    var fstatus = fs.statSync(PNG_FILE);
                    fs.open(PNG_FILE, 'r', function (status, fileDescripter) {
                        if (status) {
                            callback(status.message);
                            return;
                        }

                        var buffer = new Buffer(fstatus.size);
                        fs.read(fileDescripter, buffer, 0, fstatus.size, 0, function (err, num) {

                            request.post({
                                'url': 'https://www.googleapis.com/upload/drive/v2/files',
                                'qs': {
                                    //request module adds "boundary" and "Content-Length" automatically.
                                    'uploadType': 'multipart'

                                },
                                'headers': {
                                    'Authorization': 'Bearer ' + accessToken
                                },
                                'multipart': [
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
                function (response, body, callback) {
                    var body = JSON.parse(body);
                    callback(null, body);
                },

            ], function (err, results) {
                if (!err) {
                    let product = new Product({
                        nameproduct: req.body.nameproduct,
                        description: req.body.description,
                        price: req.body.price,
                        image: results.id,
                        color: req.body.color,
                        size: req.body.size,
                    });
                    product.save((err) => {
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
                            res.json({ success: true, message: 'product saved!' })
                        }
                    });
                }
                else {
                    console.error('---error');
                    console.error(err);
                }
            });
        }

    });
    router.get('/listproduct', function (req, res, next) {
        Product.find(function (err, doc) {
            if (err) return next(err);
            res.contentType(doc.img.contentType);
            res.send(doc.img.data);
        });
    });

    //search product
    router.get('/searcha/:namesearch', (req, res) => {

        //find with products
        Product.find({ nameproduct:{'$regex': req.params.namesearch} }, (err, products) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!products) {
                    res.json({ success: true, message: "not found" });
                    
                } else {
                    res.json({ success: true, message: "find success", products: products });

                }
            }
        });


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