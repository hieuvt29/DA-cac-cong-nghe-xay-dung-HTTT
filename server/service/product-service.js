var nv = require('node-validator');
var rule = require('./validate/product-validator');

var ProductService = function(productRepository) {
    this.productRepository = productRepository;
}

ProductService.prototype.getOne = function(condition, select, callback) {
    condition.isDelete = false;
    condition.isActive = true;
    
    this.productRepository.findOneBy(condition, select, function(err, result){
        if (err){
            return callback(err);
        } else if (result) {
            return callback(null, result);
        } else {
            return callback({type: "Not Found"});
        }
    })
}

ProductService.prototype.getMany = function(condition, orderBy, select, page, limit, callback){
    condition.isDelete = false;
    condition.isActive = true;
    
    this.productRepository.findAllBy(condition, null, orderBy, select, page, limit, function(err, result){
        if (err) {
            return callback(err);
        } else if (result){
            return callback(null, result);
        } else {
            return callback({type: "Not Found"});
        }
    })
}

ProductService.prototype.create = function(productProps, callback){
    
    // nv.run(rule, productProps, function(numErr, err){
    //     if (numErr){
    //         return callback(err);
    //     }
    // })

    this.productRepository.save(productProps, null, function(err, result){
        if (err) {
            return callback(err);
        } else if (result) {
            return callback(null, result);
        } else {
            return callback({type: "Bad Request"});
        }
    });
}

ProductService.prototype.update = function(productProps, callback){
    // nv.run(rule, productProps, function(numErr, err){
    //     if (numErr){
    //         return callback(err);
    //     }
    // })
    var condition = {
        productId: productProps.productId,
        isActive: true,
        isDelete: false
    }
    this.productRepository.findOneBy(condition, [], null, function(err, productObj){
        if (err) {
            return callback(err);
        } else if (productObj) {
            productObj = Object.assign({}, productObj, productProps);
            // validate productObj
            this.productRepository.update(productObj, null, function(err, result){
                if (err) {
                    return callback(err);
                } else if (result) {
                    return callback(null, productObj);
                } else {
                    return callback({type: 'Bad Request'});
                }
            })
        } else {
            return callback({type: 'Not Found'});
        }
    })
    
}

ProductService.prototype.delete = function(productProps, callback){
    productProps.isDelete = true;

    this.productRepository.update(productProps, null, function(err, result){
        if (err) {
            return callback(err);
        } else if (result) {
            return callback({type: "Deleted"});
        } else {
            return callback({type: "Bad Request"});
        }
    })
}

module.exports = ProductService;