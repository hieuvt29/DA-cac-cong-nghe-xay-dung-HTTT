var CustomerRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.Customer = dbContext.Customer;
}

CustomerRepository.prototype.findOneBy = function(condition, select, association, callback) {
    this.Customer
        .findOne({
            attributes: select.length ? select : null,
            where: condition ? condition: null,
            include: association
        })
        .then(function(result) {
            if (result){
                callback(null, result.dataValues);
            } else {
                callback(null, null);
            }
            
        })
        .catch(function(err) {
            callback(err, null);
        });
}

CustomerRepository.prototype.findAllBy = function (condition, association, orderBy, select, page, limit, callback) {
    this.Customer
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
                let res = result.map(function(val){
                    return val.dataValues
                })
                callback(null, res);
            } else {
                callback(null, null);
            }

        })
        .catch(function (err) {
            callback(err, null);
        });
}

CustomerRepository.prototype.save = function(customerObj, association, callback) {
    this.Customer
    .create(customerObj, {
        include: association
    })
    .then(function(result){
        if (result){   
            callback(null, result);
        } else {
            callback(null, null);
        }
    
    })
    .catch(function(err){
        callback(err, null);
    })
}

CustomerRepository.prototype.update = function(customerObj, association, callback) {
    this.Customer
    .update(customerObj, {
        where: { customerId : customerObj.customerId},
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

module.exports = CustomerRepository;