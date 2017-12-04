'use strict';

var bcrypt = require('bcrypt-nodejs');

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


module.exports = function (passport, accountService) {
    //session configure
    passport.serializeUser(function (user, done) {
        done(null, user.accountId);
    });

    passport.deserializeUser(function (id, done) {
        accountService.getOne({accountId: id}, [], function(err, account){
            return done(err, account);
        })
    });


    passport.use('login', new LocalStrategy({usernameField: 'userName', passwordField: 'password'},
        function (username, password, done) {
            var condition = {
                userName: username
            }
            accountService.getOne(condition, [], function (err, user) {
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