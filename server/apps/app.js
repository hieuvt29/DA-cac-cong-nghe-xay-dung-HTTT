
var express = require('express');
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


// Services
var ProductService = require('../service/product-service');
var productService = new ProductService(productRepository);

// Controllers
var ProductController = require('./controllers/product-controller');
var productController = new ProductController(productService);


// Routers
require('./routes/product-route')(app, productController);

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