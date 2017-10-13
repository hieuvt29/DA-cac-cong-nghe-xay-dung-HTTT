'use strict';
var bcrypt = require('bcrypt-nodejs');
var dependencies = {}

var AccountController = function (accountService) {
    dependencies.accountService = accountService;
}

AccountController.prototype.createAccount = function (req, res, next) {

    //validate
    var accountObj = Object.assign({},
        req.body, {
            password: bcrypt.hashSync(req.body.password)
        }
    );

    dependencies.accountService.createAccount(accountProps, function(err, result){
        
    })
}

AccountController.prototype.updateAccount = function (req, res) {
    var accountObj = req.body;

    dependencies.accountRepository.update(accountObj, function (err, account) {
        if (err) {
            let resObj = {
                errorCode: 1,
                message: "bad request",
                data: null
            }
            return res.json(resObj);
        }
        let resObj = {
            errorCode: 0,
            message: "updated account!",
            data: account
        };
        res.json(resObj);
    })

}
AccountController.prototype.changePassword = function (req, res) {
    var oldPass = req.body.password;
    var newPass = req.body.newPassword;

    if (!oldPass) {
        return res.json({
            errorCode: 1,
            message: 'Missing argument \'password\'',
            data: null,
        });
    }
    if (!newPassword) {
        return res.json({
            errorCode: 1,
            message: 'Missing argument \'new password\'',
            data: null,
        });
    }
    if (!bcrypt.compareSync(password, req.account.password)) {
        return res.json({
            errorCode: 1,
            message: 'Password mismatch',
            data: null
        });
    }
    req.account.password = bcrypt.hashSync(newPassword);
    req.account.save(function (err) {
        if (err) {
            let resObj = {
                errorCode: 1,
                message: "bad request",
                data: null
            }
            return res.json(resObj);
        }
        res.json({
            errorCode: 0,
            message: 'Password changed',
            data: req.account
        });
    });

}
module.exports = AccountController;