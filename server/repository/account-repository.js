var AccountRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.Account = dbContext.Account;
}

AccountRepository.prototype.findOneBy = function(condition, select, association, callback) {
    this.Account
        .findOne({
            attributes: select.length ? select : null,
            where: condition ? condition: null,
            include: association
        })
        .then(function(result) {
            if (result){
                callback(null, result);
            } else {
                callback(null, null);
            }
            
        })
        .catch(function(err) {
            callback(err, null);
        });
}

AccountRepository.prototype.findAllBy = function (condition, association, orderBy, select, page, limit, callback) {
    this.Account
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
                callback(null, result);
            } else {
                callback(null, null);
            }

        })
        .catch(function (err) {
            callback(err, null);
        });
}

AccountRepository.prototype.save = function(accountObj, association, callback) {
    this.Account
    .create(accountObj, {
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

AccountRepository.prototype.update = function(accountObj, association, callback) {
    this.Account
    .update(accountObj, {
        where: { accountId : accountObj.accountId},
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

module.exports = AccountRepository;