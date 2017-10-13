var nv = require('better-validator');
var rule = require('./validate/user-validator');

var AccountService = function (accountRepository) {
    this.accountRepository = accountRepository;
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
    // nv.run(rule.checkAccount, accountProps, function(c, err){
    //     if (c) {
    //         callback(err);
    //     }
    // })

    //check and save user
    self.accountRepository.findOneBy({
        'userName': userObj.userName
    }, [], null, function (err, user) {
        if (err) {
            next(err);
        }
        if (!user) {
            self.accountRepository.create(accountProps, null, function (err, newAccount) {
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, newAccount);
                }
            })
        } else {
            callback({
                type: "Duplicated"
            });
        }
    })
}

AccountController.prototype.update = function (accountProps, callback) {
    //validate props
    var self = this;

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

AccountController.prototype.changePassword = function (accountObj, callback) {
    // validate accountObj
    var self = this;
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

AccountController.prototype.changeUserName = function (accountProps, callback) {
    // validate accountProps 
    var self = this;
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