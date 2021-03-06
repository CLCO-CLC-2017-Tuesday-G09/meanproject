const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const MongoStore = require('connect-mongo')(session);
const userRouter=require('./routers/user.router')(router);
const productRouter=require('./routers/product.router')(router);
const menuRouter=require('./routers/menu.router')(router);
const branchRouter=require('./routers/branch.router')(router);
const catalogRouter=require('./routers/catalog.router')(router);
const cartRouter=require('./routers/cart.router')(router);
const config = require('./config/database');
//start connect database
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('Could Not connect to database : ', err);
    }
    else {
        console.log('Connect to database : ' + config.db);
    }
});
//start ejs set view
// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');
//start bodyParse and session
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));
app.use(express.static(__dirname + '/public/dist/'));
//default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/dist/index.html'));
});
//session
app.use(cookieParser());
app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(function(req, res, next) {
   req.session.cookie.maxAge = 180 * 60 * 1000; // 3 hours
    next();
});
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});
//
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/menus', menuRouter);
app.use('/branchs', branchRouter);
app.use('/catalogs', catalogRouter);
app.use('/carts', catalogRouter);
app.use(cors({
    orgin: 'http://localhost:4200'
}));
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });
// development error handler
// start server
var server = app.listen(8080, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
