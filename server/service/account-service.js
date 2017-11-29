var nv = require('node-validator');
var rule = require('./validate/user-validator');

var AccountService = function (accountRepository, customerService, adminService) {
    this.accountRepository = accountRepository;
    this.customerService = customerService;
    this.adminService = adminService;
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

AccountService.prototype.create = async function (accountProps, callback) {
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
            return callback(err);
        }
        if (!user) {
            self.accountRepository.save(accountProps, null, function (err, newAccount) {
                if (err) {
                    return callback(err);
                } else {
                    accountProps.accountId = newAccount.accountId;
                    if (newAccount.role == 1) {
                        // customer
                        self.customerService.create(accountProps, function(err, newCustomer){
                            if (err) {
                                newAccount.destroy();
                                return callback(err);
                            } else {
                                newAccount = Object.assign(newAccount.dataValues, newCustomer.dataValues);
                                return callback(null, newAccount);
                            }
                        })
                    } else if (newAccount.role == 0){
                        // admin
                        self.adminService.create(accountProps, function(err, newAdmin){
                            if (err) {
                                newAccount.destroy();
                                return callback(err);
                            } else {
                                newAccount = Object.assign(newAccount.dataValues, newAdmin.dataValues);
                                return callback(null, newAccount);
                            }
                        })
                    } else {
                        newAccount.destroy();
                        return callback({type: "Bad Request"});
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

AccountService.prototype.update = async function (accountProps, callback) {
    var self = this;
    //validate props
    var val = await validate(rule.checkAccount, accountProps);
    if (val.numErr > 0){
        return callback({type: "Bad Request", error: val.error});
    }


    self.accountRepository.findOneBy({
        accountId: accountProps.accountId
    }, [], null, function (err, accountObj) {
        if (err) {
            callback(err);
        } else if (accountObj) {
            accountObj = Object.assign({},
                accountObj,
                accountProps
            );
            accountRepository.update(accountObj, null, function (err, result) {
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

AccountService.prototype.changePassword = async function (accountProps, callback) {
    var self = this;
    var val = await validate(rule.checkAccount, accountProps);
    if (val.numErr > 0){
        return callback({type: "Bad Request", error: val.error});
    }

    self.accountRepository.update(accountProps, null, function (err, result) {
        if (err) {
            callback(err);
        } else if (result) {
            callback(null, accountProps);
        } else {
            callback({
                type: 'Bad Request'
            });
        }
    })

}

AccountService.prototype.changeUserName = async function (accountProps, callback) {
    var self = this;
    // validate accountProps 
    var val = await validate(rule.checkAccount, accountProps);
    if (val.numErr > 0){
        return callback({type: "Bad Request", error: val.error});
    }

    self.accountRepository.findOneBy({
        userName: accountProps.userName
    }, [], null, function (err, dup) {
        if (err) {
            callback(err);
        } else if (dup) {
            callback({
                type: 'Duplicated'
            });
        } else {
            self.accountRepository.findOneBy({
                accountId: accountProps.accountId
            }, [], null, function (err, accountObj) {
                if (err) {
                    callback(err);
                } else if (accountObj) {
                    accountObj = Object.assign({},
                        accountObj,
                        accountProps
                    );
                    self.accountRepository.update(accountObj, null, function (err, result) {
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

function validate(rule, obj) {
    return new Promise(function (resolve, reject) {
        nv.run(rule, obj, function (numErr, err) {
            if (numErr) {
                console.error(err);
                return resolve({
                    numErr: numErr,
                    error: err
                });
            } else {
                return resolve({
                    numErr: 0
                })
            }
        });
    })
}

module.exports = AccountService;