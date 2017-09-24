var AccountRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.Account = dbContext.Account;
}

AccountRepository.prototype.findBy = function(conditions, callback) {
    this.Account
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

AccountRepository.prototype.save = function(accountObj, callback) {
    this.Account
    .create(accountObj)
    .then(function(result){
        callback(null, result);
    })
    .catch(function(err){
        callback(err, null);
    })
}

AccountRepository.prototype.update = function(accountObj, callback) {
    this.Account
    .update(accountObj, {
        where: { 'id' : accountObj.accountId}
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

module.exports = AccountRepository;