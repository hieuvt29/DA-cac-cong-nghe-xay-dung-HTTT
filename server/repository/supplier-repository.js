var SupplierRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.Supplier = dbContext.Supplier;
}

SupplierRepository.prototype.findBy = function(conditions, callback) {
    this.Supplier
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

SupplierRepository.prototype.save = function(supplierObj, callback) {
    this.Supplier
    .create(supplierObj)
    .then(function(result){
        callback(null, result);
    })
    .catch(function(err){
        callback(err, null);
    })
}

SupplierRepository.prototype.update = function(supplierObj, callback) {
    this.Supplier
    .update(supplierObj, {
        where: { 'id' : supplierObj.supplierId}
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

module.exports = SupplierRepository;