var nv = require('node-validator');
var rule = require('./validate/user-validator');

var AccountService = function (accountRepository, customerService, supplierService) {
    this.accountRepository = accountRepository;
    this.customerService = customerService;
    this.supplierService = supplierService;
}
AccountService.prototype.getOne = function (condition, select, callback) {
    condition.isDelete = false;
    condition.isActive = true;

    this.accountRepository.findOneBy(condition, select, function (err, result) {
        if (err) {
            return callback(err);
        } else if (result) {
            return callback(null, result);
        } else {
            return callback({
                type: "Not Found"
            });
        }
    })
}

AccountService.prototype.getMany = function (condition, orderBy, select, page, limit, callback) {
    condition.isDelete = false;
    condition.isActive = true;

    this.accountRepository.findAllBy(condition, null, orderBy, select, page, limit, function (err, result) {
        if (err) {
            return callback(err);
        } else if (result) {
            return callback(null, result);
        } else {
            return callback({
                type: "Not Found"
            });
        }
    })
}

AccountService.prototype.create = function (accountProps, callback) {
    var self = this;
    //validate props
    var val = await validate(rule.checkAccount, accountProps);
    if (val.numErr > 0){
        return callback({type: "Bad Request", error: val.error});
    }

    self.accountRepository.findOneBy({
        'userName': accountProps.userName
    }, [], null, function (err, user) {
        if (err) {
            next(err);
        }
        if (!user) {
            self.accountRepository.create(accountProps, null, function (err, newAccount) {
                if (err) {
                    return callback(err);
                } else {
                    if (newAccount.role == 1) {
                        // customer
                        self.customerService.create(accountProps, function(err, newCustomer){
                            if (err) {
                                next(err);
                            } else {
                                newAccount.Customer = newCustomer;
                                return callback(null, newAccount);
                            }
                        })
                    } else if (newAccount.role == 2){
                        // supplier
                        self.supplierService.create(accountProps, function(err, newSupplier){
                            if (err) {
                                next(err);
                            } else {
                                newAccount.Supplier = newSupplier;
                                return callback(null, newAccount);
                            }
                        })
                    }
                }
            })
        } else {
            callback({
                type: "Duplicated"
            });
        }
    })
}

AccountService.prototype.update = function (accountProps, callback) {
    var self = this;
    //validate props
    var val = await validate(rule.checkAccount, accountProps);
    if (val.numErr > 0){
        return callback({type: "Bad Request", error: val.error});
    }


    self.accountRepository.findeOneBy({
        accountId: accountProps.accountId
    }, [], null, function (err, accountObj) {
        if (err) {
            callback(err);
        } else if (accountObj) {
            accountObj = Object.assign({},
                accountObj,
                accountProps
            );
            repository.update(accountObj, null, function (err, result) {
                if (err) {
                    callback(err);
                } else if (result) {
                    callback(null, accountObj)
                }
            })
        } else {
            callback({
                type: 'Not Found'
            });
        }
    })
}

AccountService.prototype.changePassword = function (accountObj, callback) {
    var self = this;
    var val = await validate(rule.checkAccount, accountProps);
    if (val.numErr > 0){
        return callback({type: "Bad Request", error: val.error});
    }


    self.accountRepository.update(accountObj, null, function (err, result) {
        if (err) {
            callback(err);
        } else if (result) {
            callback(null, accountObj);
        } else {
            callback({
                type: 'Bad Request'
            });
        }
    })

}

AccountService.prototype.changeUserName = function (accountProps, callback) {
    var self = this;
    // validate accountProps 
    var val = await validate(rule.checkAccount, accountProps);
    if (val.numErr > 0){
        return callback({type: "Bad Request", error: val.error});
    }

    self.accountRepository.findeOneBy({
        userName: accountProps.userName
    }, [], null, function (err, dup) {
        if (err) {
            callback(err);
        } else if (dup) {
            callback({
                type: 'Duplicate'
            });
        } else {
            self.accountRepository.findeOneBy({
                accountId: accountProps.accountId
            }, [], null, function (err, accountObj) {
                if (err) {
                    callback(err);
                } else if (accountObj) {
                    accountObj = Object.assign({},
                        accountObj,
                        accountProps
                    );
                    repository.update(accountObj, null, function (err, result) {
                        if (err) {
                            callback(err);
                        } else if (result) {
                            callback(null, accountObj)
                        }
                    })
                } else {
                    callback({
                        type: 'Not Found'
                    });
                }
            })
        }
    })

}


AccountService.prototype.delete = async function (accountProps, callback) {
    var val = await validate(rule.checkAccount, accountProps);
    if (val.numErr > 0) {
        return callback({
            type: "Bad Request",
            error: val.error
        });
    }

    var condition = {
        accountId: accountProps.accountId,
        isActive: true,
        isDelete: false
    }
    
    this.accountRepository.findOneBy(condition, [], null, function (err, accountObj) {
        if (err) {
            return callback(err);
        } else if (accountObj) {
            accountProps.isDelete = true;
            accountObj = Object.assign({}, accountObj, accountProps);
            
            this.accountRepository.update(accountObj, null, function (err, result) {
                if (err) {
                    return callback(err);
                } else if (result) {
                    return callback({type: "Deleted"});
                } else {
                    return callback({
                        type: 'Bad Request'
                    });
                }
            })
        } else {
            return callback({
                type: 'Not Found'
            });
        }
    })

}

function validate(rule, obj){
    return new Promise(function(resole){
        nv.run(rule, obj, function(numErr, err){
            if (numErr){
                console.error(err);
                resole({numErr: numErr, error: err});
            }
        });
    })
}
module.exports = AccountService;