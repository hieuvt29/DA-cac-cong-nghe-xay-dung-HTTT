//Require the dev-dependencies
var chai = require('chai');
var assert = chai.assert;
var chaiHttp = require('chai-http');
var server = require('../../apps/app');
var should = chai.should();

chai.use(chaiHttp);

var config = require('../../../config');

var dbContext = require('../../repository/data-context')(config.db);
// dbContext.sequelize.sync();

// var ProductRepository = require('../../repository/product-repository');
// var productRepository = new ProductRepository(dbContext);

// var ProductService = require('../../service/product-service');

describe('POST /products', function(){
    it('should create correctly and persist', function(done){
        this.timeout(10000);

        var productProps = {
            productName: "testproduct",
            categoryId: "0000", 
            supplierId: "0000", 
            price: 100000,
            quantity: 100, 
            image: "/img/testproduct",
            description: {
                name: "testproduct",
                RAM: "2GB",
                Pin: "3200mAh"
            }
        }
        chai.request(server)
            .post('/products')
            .send(productProps)
            .end(function(req, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                
                assert.equal(res.body.product.productName, productProps.productName);
                assert.equal(res.body.product.categoryId, productProps.categoryId);
                assert.equal(res.body.product.supplierId, productProps.supplierId);
                assert.equal(res.body.product.description.name, productProps.description.name);
                assert.equal(res.body.product.description.RAM, productProps.description.RAM);
                assert.equal(res.body.product.description.Pin, productProps.description.Pin);    
                
                done();
            })
    })
})
