'use strict';
var bcrypt = require('bcrypt-nodejs');
var dependencies = {}
var roles = require('../../common/role'); 
var rule = require('../../common/validate/order-validator');
var validate = require('../../common/validate-function');

var AccountController = function (accountRepository) {
    dependencies.accountRepository = accountRepository;
}

// SUPPORT FUNCTIONS

AccountController.prototype.getOne = function (condition, select, callback) {
    condition.isDelete = false;
    condition.isActive = true;

    dependencies.accountRepository.findOneBy(condition, select, null, function (err, result) {
        if (err) {
            return callback(err);
        } else if (result) {
            delete result.isActive;
            delete result.isDelete;
            
            return callback(null, result);
        } else {
            return callback({
                type: "Not Found"
            });
        }
    })
}

AccountController.prototype.getMany = function (condition, orderBy, select, page, limit, callback) {
    condition.isDelete = false;
    condition.isActive = true;

    this.accountRepository.findAllBy(condition, null, orderBy, select, page, limit, function (err, result) {
        if (err) {
            return callback(err);
        } else if (result) {
            for(i in result){
                delete result[i].isActive;
                delete result[i].isDelete;
            }
            return callback(null, result);
        } else {
            return callback({
                type: "Not Found"
            });
        }
    })
}

AccountController.prototype.create = async function (accountProps, callback) {
    //validate props
    var val = await validate(rule, accountProps);
    if (val.numErr > 0){
        return callback({type: "Bad Request", error: val.error});
    }

    dependencies.accountRepository.findOneBy({
        'userName': accountProps.userName
    }, [], null, function (err, user) {
        if (err) {
            return callback(err);
        }
        if (!user) {
            dependencies.accountRepository.save(accountProps, null, function (err, newAccount) {
                if (err) {
                    return callback(err);
                } else {
                    delete newAccount.isActive;
                    delete newAccount.isDelete;
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

AccountController.prototype.update = async function (accountProps, callback) {
    //validate props
    var val = await validate(rule, accountProps);
    if (val.numErr > 0){
        return callback({type: "Bad Request", error: val.error});
    }

    dependencies.accountRepository.findOneBy({
        accountId: accountProps.accountId
    }, [], null, function (err, accountObj) {
        if (err) {
            callback(err);
        } else if (accountObj) {
            accountObj = Object.assign({},
                accountObj,
                accountProps
            );
            dependencies.accountRepository.update(accountObj, null, function (err, result) {
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

// BUSINESS FUNCTIONS
// -- COMMONS

AccountController.prototype.changePassword = async function (req, res, next) {
    var oldPass = req.body.oldPassword;
    var newPass = req.body.newPassword;

    if (!oldPass) {
        res.error = {
            errorCode: 1,
            message: 'Missing argument \'old password\'',
            data: null,
        };
        return next();
    }
    if (!newPass) {
        res.error = {
            errorCode: 1,
            message: 'Missing argument \'new password\'',
            data: null,
        };
        return next();
    }
    if (!bcrypt.compareSync(oldPass, req.user.password)) {
        res.error = {
            errorCode: 1,
            message: 'Password mismatch',
            data: null
        };
        return next();
    }

    var userProps = Object.assign({}, req.user, {password: bcrypt.hashSync(newPass)});

    var val = await validate(rule, accountProps);
    if (val.numErr > 0){
        return callback({type: "Bad Request", error: val.error});
    }

    dependencies.accountRepository.update(accountProps, null, function (err, result) {
        if (err) {
            callback(err);
        } else if (result) {
            res.account = accountProps;
            req.user = accountProps;
            next();
        } else {
            callback({
                type: 'Bad Request'
            });
        }
    })
}

AccountController.prototype.changeUserName = async function (req, res, next) {
    var newUserName = req.body.newUserName;
    
    var accountProps = Object.assign({}, req.user, {userName: newUserName});
    var self = this;
    // validate accountProps 
    var val = await validate(rule, accountProps);
    if (val.numErr > 0){
        return callback({type: "Bad Request", error: val.error});
    }

    dependencies.accountRepository.findOneBy({
        userName: accountProps.userName
    }, [], null, function (err, dup) {
        if (err) {
            callback(err);
        } else if (dup) {
            callback({
                type: 'Duplicated'
            });
        } else {
            dependencies.accountRepository.update(accountObj, null, function (err, result) {
                if (err) {
                    callback(err);
                } else if (result) {
                    res.account = accountProps;
                    req.user = accountProps;
                    next();
                }
            })
        }
    })
}

AccountController.prototype.delete = async function (req, res, next) {
    var accountId = req.params.accountId;

    var self = this;
    var val = await validate(rule, accountProps);
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
    
    dependencies.accountRepository.findOneBy(condition, [], null, function (err, accountObj) {
        if (err) {
            return callback(err);
        } else if (accountObj) {
            accountProps.isDelete = true;
            accountObj = Object.assign({}, accountObj, accountProps);
            
            dependencies.accountRepository.update(accountObj, null, function (err, result) {
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

// -- CUSTOMER
AccountController.prototype.getCustomer = function (req, res, next) {
    var accountId = req.params.accountId;

    this.getOne({ 'accountId': accountId, role: roles.CUSTOMER }, [], function (err, account) {
        if (err) {
            next(err);
        } else {
            res.account = account;
            next();
        }
    })
}

AccountController.prototype.getCustomers = function (req, res, next) {
    var condition = req.where;
    var orderBy = req.options.sort;
    var select = req.fields ? req.fields : [];
    var page = req.options.skip;
    var limit = req.options.limit;

    condition.role = roles.CUSTOMER;
    this.getMany(condition, orderBy, select, page, limit, function (err, accounts) {
        if (err) {
            next(err);
        } else {
            res.accounts = accounts;
            next();
        }
    })
}

AccountController.prototype.createCustomer = function (req, res, next) {
    // return error when create admin
    if (req.body.role == roles.ADMIN) {
        return next({type: "Bad Request", message: "Cannot create admin account"});
    }
    var accountProps = Object.assign({},
        req.body, {
            password: bcrypt.hashSync(req.body.password)
        }
    );

    this.create(accountProps, function(err, result){
        if (err){
            next(err);
        } else {
            res.account = result;
            next();
        }
    })
}

// -- ADMIN
AccountController.prototype.getAdmin = function (req, res, next) {
    var accountId = req.params.accountId;

    this.getOne({ 'accountId': accountId, role: roles.ADMIN }, [], function (err, account) {
        if (err) {
            next(err);
        } else {
            res.account = account;
            next();
        }
    })
}

AccountController.prototype.getAdmins = function (req, res, next) {
    var condition = req.where;
    var orderBy = req.options.sort;
    var select = req.fields ? req.fields : [];
    var page = req.options.skip;
    var limit = req.options.limit;

    condition.role = roles.ADMIN;
    this.getMany(condition, orderBy, select, page, limit, function (err, accounts) {
        if (err) {
            next(err);
        } else {
            res.accounts = accounts;
            next();
        }
    })
}

AccountController.prototype.createAdmin = function (req, res, next) {
    // return error when create admin
    if (req.body.role == roles.CUSTOMER) {
        return next({type: "Bad Request", message: "Cannot create account account"});
    }
    var accountProps = Object.assign({},
        req.body, {
            password: bcrypt.hashSync(req.body.password)
        }
    );

    this.create(accountProps, function(err, result){
        if (err){
            next(err);
        } else {
            res.account = result;
            next();
        }
    })
}

module.exports = AccountController;