'use strict';

var dbContext = require('../repository/data-context');
var AccountRepository = require('../repository/account-repository');
var accountRepository = new AccountRepository(dbContext);

var bcrypt = require('bcrypt-nodejs');

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


module.exports = function (passport) {
    //session configure
    passport.serializeUser(function (user, done) {
        done(null, user.accountId);
    });

    passport.deserializeUser(function (id, done) {
        accountRepository.findOneBy({accountId: id}, function (err, user) {
            done(err, user);
        });
    });


    passport.use('login', new LocalStrategy(
        function (userName, password, done) {
            var condition = {
                userName: userName
            }
            accountRepository.findOneBy(condition, [], function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect username.'
                    });
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                return done(null, user);
            });
        }
    ));
}