var ProductRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.Product = dbContext.Product;
}

ProductRepository.prototype.findBy = function(conditions, callback) {
    this.Product
    .findOne({
        where : conditions
    })
    .then(function(result){
        callback(null, result.dataValues);
    })
    .catch(function(err){
        callback(err, null);
    })
}

ProductRepository.prototype.save = function(productObj, callback) {
    this.Product
    .create(productObj)
    .then(function(result){
        callback(null, result);
    })
    .catch(function(err){
        callback(err, null);
    })
}

ProductRepository.prototype.update = function(productObj, callback) {
    this.Product
    .update(productObj, {
        where: { 'id' : productObj.productId}
    })
    .then(function(result){
        if(result.every(function(val){
            return val == 1;
        })){
            callback(null, true);
        }else{
            callback(null, false);
        }
    })
    .catch(function(err){
        callback(err, null);
    })
}

module.exports = ProductRepository;