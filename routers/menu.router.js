const Menu = require('../models/menu');
const config = require('../config/database');
var fs = require('fs');
module.exports = (router) => {
    router.post('/createmenu', (req, res) => {
        if(!req.body.menuname)
        {
          if (err.code === 11000) {
            res.json({ success: false, message: 'menu name allready exists' });
        }
        else {
            if (err.errors) {
                res.json({ success: false, message: err.message });

            }
            else {
                res.json({ success: false, message: 'Could not save Menu. Error: ', err });
            }
        }
        }
        else
        {
        var NewMenu = new Menu();
        NewMenu.menuname = req.body.menuname;
        NewMenu.save((err,menus)=>{
            if(err)
            {
                res.json({ success: false, message: 'No save' }); // Return error
            }
            else{
                res.json({ success: true, message: 'save',menus:menus}); // Return sucess
            }
        });
    }
    });
    router.get('/listmenu', function (req, res, next) {
        Menu.find( function (err, menus) {
          if (err){
            res.json({ success: false, message: err }); // Return error
          }
          else
          {
            res.json({ success: true, message: 'find',menus:menus}); // Return sucess
          }
        }).sort({ '_id': -1 }).populate('branchs');
      });
  //find one a menu
  router.get('/findmenu/:id', (req, res) => {
    Menu.findId({ _id: req.params.id }, (err, menus) => {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            if (!user) {
                res.json({ success: false, message: 'Menu is not found' });
            } else {
                res.json({ success: true, message: 'find',menus:menus});
            }
        }
    });
});
      router.delete('/deletemenu/:id', function (req, res) {
        if (!req.params.id) {
            res.json({ success: false, message: 'no find menu' });
        }
        else
        {
        Menu.findByIdAndRemove({_id:req.params.id},function (err,menu) {
          if (err){
            res.json({ success: false, message: err }); // Return error
          }
          else
          {
            res.json({ success: true, message: "Menu " + menu.menuname + " was deleted" });
          }
        });
    }
      });

      
    return router;
}