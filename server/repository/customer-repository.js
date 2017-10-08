var CustomerRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.Customer = dbContext.Customer;
}

CustomerRepository.prototype.findOneBy = function(condition, select, callback) {
    this.Customer
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

CustomerRepository.prototype.findAllBy = function (condition, orderBy, select, page, limit, callback) {
    this.Customer
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

CustomerRepository.prototype.save = function(customerObj, callback) {
    this.Customer
    .create(customerObj)
    .then(function(result){
        callback(null, result.dataValues);
    })
    .catch(function(err){
        callback(err, null);
    })
}

CustomerRepository.prototype.update = function(customerObj, callback) {
    this.Customer
    .update(customerObj, {
        where: { 'id' : customerObj.customerId}
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