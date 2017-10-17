const Catalog = require('../models/catalog');
const Branch = require('../models/branch');
const config = require('../config/database');

module.exports = (router) => {

    
    //add catalog
    router.post('/addCatalog/:idBranch', (req, res) => {
        if (!req.body.catalogName  || !req.params.idBranch) {
            res.json({ success: false, message: 'you must enter input' });
        }
        else {
            var newcatalog = new Catalog({
                idBranch: null,
                catalogName: req.body.catalogName,
            });
            newcatalog.save((err, result) => {
                if (err) {
                    if (err.code === 11000) {
                        res.json({ success: false, message: 'Catalog name allready exists' });
                    }
                    else {
                        if (err.errors) {
                            res.json({ success: false, message: err.message });

                        }
                        else {
                            res.json({ success: false, message: 'Could not save catalog. Error: ', err });
                        }
                    }
                }
                //when add catalog success
                else {
                    //this id from Method Post
                    var idBranch = req.params.idBranch;
                    //find id of branch and update field categories of collection Branch
                    Branch.findByIdAndUpdate(idBranch, 
                    { "$push": { "cataloges": result } },
                    { "new": true, "upsert": true }, function (err, data) {
                        if (err) {
                            res.json(err);
                        } else {
                            
                            //update filed idBranch in Catalog
                            Catalog.findByIdAndUpdate(result._id, 
                                {$set:{idBranch: idBranch}}, {new: true},
                                function (err, dataNew) {
                                    if (err) {
                                        res.json(err);
                                    } else {
                                        
                                        res.json({ success: true, message: dataNew })
                                    }
            
                                });
                        }

                    });
                }
            });
        }
    });
    
    router.put('/updateCatalog', (req, res) => {
        if (!req.body.catalogName) {
            res.json({ success: false, message: 'no find username' });
        }
        else {
            Catalog.findOne({ catalogName: req.body.catalogName }, (err, catalog) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (!catalog) {
                        res.json({ success: false, message: 'false' });
                    }
                    else {
                        catalog.catalogName = req.body.catalogName;
                        catalog.countProductInCatalog = req.body.countProductInCatalog;

                        catalog.save((err) => {
                            if (err) {
                                res.json({ success: false, message: 'can not save' });
                            }
                            else {
                                res.json({ success: true, message: 'data is updated' });
                            }
                        });
                    }
                }
            });

        }
    });
    //find all category
    router.get('/allcatalog', (req, res) => {
        Catalog.find((err, catalogs) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!catalogs) {
                    res.json({ success: false, message: 'No catalog found.' });
                } else {
                    res.json({ success: true,message:"find success", catalogs: catalogs });

                }
            }
        });
});
    //find all category of one branch
    router.get('/listcatalog/:idbranch', (req, res) => {
        //res.json({ success: false, message: req.params.branchName });
        Branch.find({_id: req.params.idbranch}, (err, branch) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!branch) {
                    res.json({ success: false, message: 'No branch found.' });
                } else {
                    Catalog.find({idBranch: branch[0]['_id']}, (err, catalogs) => {
                        if (err) {
                            res.json({ success: false, message: err });
                        } else {
                            if (!catalogs) {
                                res.json({ success: false, message: 'No catalog found.' });
                            } else {
                                res.json({ success: true, catalogs: catalogs });
            
                            }
                        }
                    })

                }
            }
        })
    });
    //search catalog
router.get('/searchcatalog/:namecatalog', (req, res) => {
    
            //find with products
            Catalog.find({ catalogName: {'$regex': req.params.namecatalog} }, (err, catalogs) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (!catalogs || catalogs=="") {
                        res.json({ success: true, message: "can not found" });
                    } else {
                        res.json({ success: true, message: "find success", catalogs: catalogs });
    
                    }
                }
            });
        });

    // DELETES A CATALOG FROM THE DATABASE
    router.delete('/deletecatalog/:id', function (req, res) {
        if (!req.params.id) {
            res.json({ success: false, message: 'no find menu' });
        }
        else
        {
        Catalog.findByIdAndRemove({_id:req.params.id},function (err,catalog) {
          if (err){
            res.json({ success: false, message: err }); // Return error
          }
          else
          {
            res.json({ success: true, message: "catalog: " + catalog.catalogName + " was deleted" });
          }
        });
    }
      });
    
    //find one a catalog
    router.get('/findCatalog/:catalogName', (req, res) => {
        Catalog.findOne({ catalogName: req.params.catalogName }, (err, catalog) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!catalog) {
                    res.json({ success: false, message: 'Catalog name is not found' });
                } else {
                    res.json({ success: true, message: catalog.catalogName + ' is found', catalog: catalog });
                }
            }
        }).populate('idBranch');
    });
    return router;
}