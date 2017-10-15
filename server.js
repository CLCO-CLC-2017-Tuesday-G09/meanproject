const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const userRouter=require('./routers/user.router')(router);
const productRouter=require('./routers/product.router')(router);
const menuRouter=require('./routers/menu.router')(router);
const branchRouter=require('./routers/branch.router')(router);
const catalogRouter=require('./routers/catalog.router')(router);
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
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/menus', menuRouter);
app.use('/branchs', branchRouter);
app.use('/catalogs', catalogRouter);
// app.use(cors({
//     orgin: 'http://localhost:4200'
// }));
//router
// app.get('/', function(req, res) {
//     res.render('index');
// });
// start server
var server = app.listen(8080, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
