var CustomerRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.Customer = dbContext.Customer;
}

CustomerRepository.prototype.findBy = function(conditions, callback) {
    this.Customer
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

CustomerRepository.prototype.save = function(customerObj, callback) {
    this.Customer
    .create(customerObj)
    .then(function(result){
        callback(null, result);
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