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


module.exports = AccountController;