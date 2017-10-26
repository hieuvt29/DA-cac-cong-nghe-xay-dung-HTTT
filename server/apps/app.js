
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

var CustomerRepository = require('../repository/customer-repository');
var customerRepository = new CustomerRepository(dbContext);

var SupplierRepository = require('../repository/supplier-repository');
var supplierRepository = new SupplierRepository(dbContext);

// Services
var ProductService = require('../service/product-service');
var productService = new ProductService(productRepository);

var AccountService = require('../service/product-service');
var accountService = new AccountService(accountRepository);

// Controllers
var ProductController = require('./controllers/product-controller');
var productController = new ProductController(productService);

var AccountController = require('./controllers/account-controller');
var accountController = new AccountController(accountService);

//config the passport 
require('../config/passport')(passport, accountRepository, supplierRepository, customerRepository);

//config the session for passport
app.use(session({
	secret: 'secretProject3',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Routers
require('./routes/product-route')(app, productController);
require('./routes/account-route')(app, accountController, passport);
app.use(function(err, req, res, next) {
    console.error(new Date() + " - " + JSON.stringify(err, null, '\t'));
    
    if(err.type) {
        switch(err.type) {
            case 'Bad Request':
                return res.status(400).send({ error: err });
                break;
            case 'Request Failed':
                return res.status(502).send({ error: 'Request Failed' });
                break;
            case 'Not Found':
                return res.status(404).send({ error: 'Not Found' });
                break;
            case 'Duplicated':
                return res.status(400).send({ error: 'Duplicated' });
                break;
            case 'Deleted':
                return res.status(200).send({ error: 'Deleted' });
                break;
            default:
                return res.status(500).send({ error: 'Something failed!' });
            
        }
    } else {
        next(err);
    }
})

app.use(function(err, req, res, next) {
    res.status(500).send({ error: 'Something failed!' });
})

var port = config.port;
app.listen(port, function(){
    console.log("server is listening on port: ", port);
});

module.exports = app;