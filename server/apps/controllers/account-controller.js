'use strict';
var bcrypt = require('bcrypt-nodejs');
var dependencies = {}
var roles = require('../../common/role'); 

var AccountController = function (accountService) {
    dependencies.accountService = accountService;
}

AccountController.prototype.getCustomer = function (req, res, next) {
    var accountId = req.params.accountId;

    dependencies.accountService.getOne({ 'accountId': accountId, role: roles.CUSTOMER }, [], function (err, account) {
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
    dependencies.accountService.getMany(condition, orderBy, select, page, limit, function (err, accounts) {
        if (err) {
            next(err);
        } else {
            res.accounts = accounts;
            next();
        }
    })
}

AccountController.prototype.getAdmin = function (req, res, next) {
    var accountId = req.params.accountId;

    dependencies.accountService.getOne({ 'accountId': accountId, role: roles.ADMIN }, [], function (err, account) {
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
    dependencies.accountService.getMany(condition, orderBy, select, page, limit, function (err, accounts) {
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

    dependencies.accountService.create(accountProps, function(err, result){
        if (err){
            next(err);
        } else {
            res.account = result;
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

    dependencies.accountService.create(accountProps, function(err, result){
        if (err){
            next(err);
        } else {
            res.account = result;
            next();
        }
    })
}

AccountController.prototype.changePassword = function (req, res, next) {
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
    dependencies.accountService.changePassword(userProps, function(err, result){
        if (err) {
            next(err);
        } else {
            req.user = result;
            res.account = result;
            next();
        }
    })
}

AccountController.prototype.changeUserName = function (req, res, next) {
    var newUserName = req.body.newUserName;
    
    var accountProps = Object.assign({}, req.user, {userName: newUserName});
    dependencies.accountService.changeUserName(accountProps, function(err, result){
        if (err) {
            next(err);
        } else {
            res.account = result;
            req.user = result;
            next();
        }
    })
}

AccountController.prototype.delete = function (req, res, next) {
    var accountId = req.params.accountId;

    dependencies.accountService.delete({ 'accountId': accountId }, function (err, result) {
        if (err) {
            next(err);
        } else {
            res.account = result;
            next();
        }
    })
}


module.exports = AccountController;