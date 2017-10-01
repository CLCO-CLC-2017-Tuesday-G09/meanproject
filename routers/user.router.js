const User = require('../models/user');
const config = require('../config/database');


module.exports = (router) => {
    router.post('/register', (req, res) => {
        if (!req.body.email || !req.body.fullname ||  !req.body.username || !req.body.address || !req.body.numberphone||  !req.body.password) {
            res.json({ success: false, message: 'you must enter input' });
        }
        else {
            let user = new User({
                email: req.body.email.toLowerCase(),
                username: req.body.username.toLowerCase(),
                fullname: req.body.fullname.toLowerCase(),
                address: req.body.address.toLowerCase(),
                numberphone: req.body.numberphone.toLowerCase(),
                password: req.body.password
            });
            user.save((err) => {
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
                    res.json({ success: true, message: 'user saved!' })
                }
            });
        }
    });
    router.put('/updateuser', (req, res) => {
        if (!req.body.username) {
            res.json({ success: false, message: 'no find username' });
        }
        else {
            User.findOne({ username: req.body.username }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (!user) {
                        res.json({ success: false, message: 'false' });
                    }
                    else {
                        user.email = req.body.email;
                        user.password = req.body.password;
                        user.address=req.body.address;
                        user.numberphone=req.body.numberphone;
                        user.fullname=req.body.fullname;
                        user.save((err) => {
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
    // DELETES A USER FROM THE DATABASE
    router.delete('/deleteuser', (req, res) => {
        if (!req.body.username) {
            res.json({ success: false, message: 'no find username' });
        }
        else {
            User.findOneAndRemove({ username: req.body.username }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                }
                else {
                    if (!user) {
                        res.json({ success: false, message: 'can not found username' });
                    }
                    else {
                        res.json({ success: true, message: "User " + user.username + " was deleted" });
                    }
                }
            });
        }
    });
//find all list user
    router.get('/listmember', (req, res) => {
        User.find({}, (err, users) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!users) {
                    res.json({ success: false, message: 'No User found.' });
                } else {
                    res.json({ success: true, users: users });
                }
            }
        }).sort({ '_id': -1 });
    });
    //find one a user
    router.get('/findmember/:username', (req, res) => {
        User.findOne({ username: req.params.username }, (err, user) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!user) {
                    res.json({ success: false, message: 'User name is not found' });
                } else {
                    res.json({ success: true, message: user.username + ' is found', user: user });
                }
            }
        });
    });
    return router;
}