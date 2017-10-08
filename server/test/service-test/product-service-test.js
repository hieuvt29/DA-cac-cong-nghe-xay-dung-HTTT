var chai = require('chai');
var assert = chai.assert;
var uuidv4 = require('uuid/v4');


var config = require('../../../config');

var dbContext = require('../../repository/data-context')(config.db);
// dbContext.sequelize.sync();


var ProductService = require('../../service/product-service');

describe('create valid product', function(){
    it('should create correctly and persist', function(done){
        this.timeout(10000);
        var mockProductRepository = {
            save: function(obj, callback){
                callback(null, obj);
            },
            update: function(obj, callback){
                callback(null, true);
            },
        }
        var productService = new ProductService(mockProductRepository);

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

        productService.create(productProps, function(err, result){
            assert.equal(err, null);
            assert.equal(result.productName, productProps.productName);
            assert.equal(result.categoryId, productProps.categoryId);
            assert.equal(result.supplierId, productProps.supplierId);
            assert.equal(result.description.name, productProps.description.name);
            assert.equal(result.description.RAM, productProps.description.RAM);
            assert.equal(result.description.Pin, productProps.description.Pin);         
            
            done();
            
        })

    })
});

describe('update valid product', function(){
    it('should update correctly and persist', function(done){
        this.timeout(10000);
        var productProps = {
            productId: uuidv4(),
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
        var updateProductProps = {
            productId: productProps.productId,            
            productName: "updated",
            price: 1,
            quantity: 100, 
            image: "/img/testproduct",
            description: {
                name: "updated",
                RAM: "2GB",
                Pin: "3200mAh"
            }
        }
        var mockProductRepository = {
            save: function(obj, callback){
                callback(null, obj);
            },
            update: function(obj, callback){
                callback(null, true);
            },
        }
        var productService = new ProductService(mockProductRepository);

        productService.create(productProps, function(err, savedProps){
            productService.update(updateProductProps, function(err, updatedProps){

                assert.equal(err, null);
                assert.equal(updatedProps.productName, updateProductProps.productName);
                assert.equal(updatedProps.description.name, updateProductProps.description.name);
                assert.equal(updatedProps.description.RAM, updateProductProps.description.RAM);
                assert.equal(updatedProps.description.Pin, updateProductProps.description.Pin);  
                
                done();

            })
        })

    })
})