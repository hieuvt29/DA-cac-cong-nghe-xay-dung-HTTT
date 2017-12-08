
var express = require('express');
var passport = require('passport');
var session = require('express-session');
var queryHandler = require('express-api-queryhandler');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('../../config');
var compress = require('compression');
/* ===== Express setup ===== */

var app  = express();
app.use(queryHandler.fields());
app.use(queryHandler.filter());
app.use(queryHandler.pagination({limit: 100}));
app.use(queryHandler.sort());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compress());
app.use(cors());


var dbContext = require('../repository/data-context')(config.db);
// dbContext.sequelize.sync();

// Repositories
var ProductRepository = require('../repository/product-repository');
var productRepository = new ProductRepository(dbContext);

var AccountRepository = require('../repository/account-repository');
var accountRepository = new AccountRepository(dbContext);

var SupplierRepository = require('../repository/supplier-repository');
var supplierRepository = new SupplierRepository(dbContext);

var CategoryRepository = require('../repository/category-repository');
var categoryRepository = new CategoryRepository(dbContext);

var OrderRepository = require('../repository/order-repository');
var orderRepository = new OrderRepository(dbContext);

// Controllers
var ProductController = require('./controllers/product-controller');
var productController = new ProductController(productRepository, categoryRepository, supplierRepository);

var AccountController = require('./controllers/account-controller');
var accountController = new AccountController(accountRepository);

var SupplierController = require('./controllers/supplier-controller');
var supplierController = new SupplierController(supplierRepository);

var CategoryController = require('./controllers/category-controller');
var categoryController = new CategoryController(categoryRepository);

var OrderController = require('./controllers/order-controller');
var orderController = new OrderController(orderRepository);

var StatisticController = require('./controllers/statistic-controller');
var statisticController = new StatisticController(orderRepository);
//config the passport
require('../config/passport')(passport, accountRepository);

//config the session for passport
app.use(session({
	secret: 'secretProject3',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Routers
require('./routes/product-route')(app, productController, passport);
require('./routes/account-route')(app, accountController, passport);
require('./routes/supplier-route')(app, supplierController);
require('./routes/category-route')(app, categoryController);
require('./routes/order-route')(app, orderController);
require('./routes/statistic-route')(app, statisticController);

app.use(function(err, req, res, next) {
    console.error(new Date() + " - " + JSON.stringify(err, null, '\t'));
    
    if(err.type) {
        switch(err.type) {
            case 'Bad Request':
                return res.status(400).send(err);
                break;
            case 'Request Failed':
                return res.status(502).send({ message: 'Request Failed' });
                break;
            case 'Not Found':
                return res.status(404).send({ message: 'Not Found' });
                break;
            case 'Duplicated':
                return res.status(400).send({ message: 'Duplicated' });
                break;
            default:
                return res.status(300).send({ message: err });
            
        }
    } else {
        next(err);
    }
})

app.use(function(err, req, res, next) {
    res.status(500).send({ message: 'Something failed!' });
})

var port = config.port;
app.listen(port, function(){
    console.log("server is listening on port: ", port);
});

module.exports = app;