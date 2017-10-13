'use strict';
var bcrypt = require('bcrypt-nodejs');
var dependencies = {}

var AccountController = function (accountService) {
    dependencies.accountService = accountService;
}

AccountController.prototype.create = function (req, res, next) {

    //validate
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
    var oldPass = req.body.password;
    var newPass = req.body.newPassword;

    if (!oldPass) {
        res.error = {
            errorCode: 1,
            message: 'Missing argument \'password\'',
            data: null,
        };
        next();
    }
    if (!newPassword) {
        res.error = {
            errorCode: 1,
            message: 'Missing argument \'new password\'',
            data: null,
        };
        next();
    }
    if (!bcrypt.compareSync(oldPass, req.user.password)) {
        res.error = {
            errorCode: 1,
            message: 'Password mismatch',
            data: null
        };
        next();
    }

    req.user.password = bcrypt.hashSync(newPass);
    dependencies.accountService.changePassword(req.user, function(err, result){
        if (err) {
            next(err);
        } else {
            res.account = result;
            next();
        }
    })
}

AccountController.prototype.changeUserName = function (req, res, next) {
    var newUserName = req.body.userName;
    
    dependencies.accountService.changeUserName(req.user, function(err, result){
        if (err) {
            next(err);
        } else {
            res.account = result;
            req.user.userName = newUserName;
            next();
        }
    })
}


module.exports = AccountController;