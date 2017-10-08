var ProductService = function(productRepository) {
    this.productRepository = productRepository;
}

ProductService.prototype.findOne = function(condition, select, callback) {
    condition.isDelete = false;
    
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

ProductService.prototype.findAll = function(condition, orderBy, select, page, limit, callback){
    condition.isDelete = false;
    
    this.productRepository.findAllBy(condition, orderBy, select, page, limit, function(err, result){
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
    var productObj = productProps;

    this.productRepository.save(productObj, function(err, result){
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
    var productObj = productProps;
    
    this.productRepository.update(productObj, function(err, result){
        if (err) {
            return callback(err);
        } else if (result) {
            return callback(null, productProps);
        } else {
            return callback({type: 'Bad Request'});
        }
    })
}

ProductService.prototype.delete = function(productProps, callback){
    productProps.isDelete = true;

    this.productRepository.update(productProps, function(err, result){
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