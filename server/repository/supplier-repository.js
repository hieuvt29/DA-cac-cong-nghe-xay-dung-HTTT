var SupplierRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.Supplier = dbContext.Supplier;
}

SupplierRepository.prototype.findOneBy = function(condition, select, association, callback) {
    this.Supplier
        .findOne({
            attributes: select.length ? select : null,
            where: condition ? condition: null,
            include: association
        })
        .then(function(result) {
            if (result){
                delete result.dataValues.isDelete;
                callback(null, result);
            } else {
                callback(null, null);
            }
            
        })
        .catch(function(err) {
            callback(err, null);
        });
}

SupplierRepository.prototype.findAllBy = function (condition, association, orderBy, select, page, limit, callback) {
    this.Supplier
        .findAll({
            attributes: select.length ? select : null,
            where: condition ? condition : null,
            order: orderBy ? orderBy : null,
            limit: limit,
            offset: page * limit,
            include: association
        })
        .then(function (result) {
            if (result){
                result.forEach(function (o) {
                    delete o.dataValues.isDelete;
                });
                callback(null, result);
            } else {
                callback(null, null);
            }

        })
        .catch(function (err) {
            callback(err, null);
        });
}

SupplierRepository.prototype.save = function(supplierObj, association, callback) {
    this.Supplier
    .create(supplierObj, {
        include: association
    })
    .then(function(result){
        if (result){   
            delete result.dataValues.isDelete;
            callback(null, result);
        } else {
            callback(null, null);
        }
    
    })
    .catch(function(err){
        callback(err, null);
    })
}

SupplierRepository.prototype.update = function(supplierObj, association, callback) {
    this.Supplier
    .update(supplierObj, {
        where: { supplierId : supplierObj.supplierId},
        include: association
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