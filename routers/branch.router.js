const Branch = require('../models/branch');
const Menu = require('../models/menu');
const Catalog = require('../models/catalog');
const config = require('../config/database');


module.exports = (router) => {

    //add branch
    router.post('/addbranch/:idmenu', (req, res) => {
        if (!req.body.branchName || !req.body.image ||
            !req.body.description || !req.params.idmenu) {
            res.json({ success: false, message: 'you must enter input' });
        }
        else {
            var newbranch = new Branch({
                idmenu: null,
                branchName: req.body.branchName,
                image: req.body.image,
                description: req.body.description
            });
            newbranch.save((err, result) => {
                if (err) {
                    if (err.code === 11000) {
                        res.json({ success: false, message: 'Branch name allready exists' });
                    }
                    else {
                        if (err.errors) {
                            res.json({ success: false, message: err.message });

                        }
                        else {
                            res.json({ success: false, message: 'Could not save branch. Error: ', err });
                        }
                    }
                }
                //when add branch success
                else {
                    //this id from Method Post
                    var idmenu = req.params.idmenu;
                    //find id of branch and update field branchs of collection menu
                    Menu.findByIdAndUpdate(idmenu,
                        { "$push": { "branches": result } },
                        { "new": true, "upsert": true }, function (err, data) {
                            if (err) {
                                res.json(err);
                            } else {
                                //update filed idMenu in Menu
                                Branch.findByIdAndUpdate(result._id,
                                    { $set: { idmenu: idmenu } }, { new: true },
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
   
 //find all category of one branch
 router.get('/listbranch/:idmenu', (req, res) => {
    //res.json({ success: false, message: req.params.branchName });
    Menu.find({_id: req.params.idmenu}, (err, menu) => {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            if (!menu) {
                res.json({ success: false, message: 'No menu found.' });
            } else {
                Branch.find({idmenu: menu[0]['_id']}, (err, branches) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        if (!branches) {
                            res.json({ success: false, message: 'No catalog found.' });
                        } else {
                            res.json({ success: true,message:menu[0]['_id'], branches: branches });
        
                        }
                    }
                });

            }
        }
    })
});

router.delete('/deletebranch/:id', function (req, res) {
    if (!req.params.id) {
        res.json({ success: false, message: 'no find menu' });
    }
    else
    {
    Branch.findByIdAndRemove({_id:req.params.id},function (err,branch) {
      if (err){
        res.json({ success: false, message: err }); // Return error
      }
      else
      {
        res.json({ success: true, message: "branch: " + branch.branchName + " was deleted" });
      }
    });
}
  });

    return router;
}