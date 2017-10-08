var SupplierRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.Supplier = dbContext.Supplier;
}

SupplierRepository.prototype.findOneBy = function(condition, select, callback) {
    this.Supplier
        .findOne({
            attributes: select.length ? select : null,
            where: condition ? condition: null,
        })
        .then(function(result) {
            callback(null, result.dataValues);
        })
        .catch(function(err) {
            callback(err, null);
        });
}

SupplierRepository.prototype.findAllBy = function (condition, orderBy, select, page, limit, callback) {
    this.Supplier
        .findAll({
            attributes: select.length ? select : null,
            where: condition ? condition : null,
            order: orderBy ? orderBy : null,
            limit: limit,
            offset: page * limit
        })
        .then(function (result) {
            let res = result.map(function(val){
                return val.dataValues
            })
            callback(null, res);
        })
        .catch(function (err) {
            callback(err, null);
        });
}

SupplierRepository.prototype.save = function(supplierObj, callback) {
    this.Supplier
    .create(supplierObj)
    .then(function(result){
        callback(null, result.dataValues);
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