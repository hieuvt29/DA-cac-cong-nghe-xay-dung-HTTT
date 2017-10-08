var AccountRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.Account = dbContext.Account;
}

AccountRepository.prototype.findOneBy = function(condition, select, callback) {
    this.Account
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

AccountRepository.prototype.findAllBy = function (condition, orderBy, select, page, limit, callback) {
    this.Account
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

AccountRepository.prototype.save = function(accountObj, callback) {
    this.Account
    .create(accountObj)
    .then(function(result){
        callback(null, result.dataValues);
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