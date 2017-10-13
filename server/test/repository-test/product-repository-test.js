var chai = require('chai');
var assert = chai.assert;
var uuidv4 = require('uuid/v4');


var config = require('../../../config');

var dbContext = require('../../repository/data-context')(config.db);


var ProductRepository = require('../../repository/product-repository');
var productRepository = new ProductRepository(dbContext);

describe('create new valid product', function(){
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
        dbContext.sequelize.sync().then(function(){
            productRepository.save(productProps, null, function(err, result){
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
        
    })
})

describe('update new valid product', function(){
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

        productRepository.save(productProps, null, function(err, savedProps){
            productRepository.update(updateProductProps, null, function(err, isUpdated){
                assert.equal(err, null);
                assert.equal(isUpdated, true);
                productRepository.findOneBy({productId: updateProductProps.productId}, [], null, function(err, updatedProps){
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
})
