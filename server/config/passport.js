'use strict';

var bcrypt = require('bcrypt-nodejs');

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


module.exports = function (passport, accountRepository, supplierRepository, customerRepository) {
    //session configure
    passport.serializeUser(function (user, done) {
        done(null, user.accountId);
    });

    passport.deserializeUser(function (id, done) {
        accountRepository.findOneBy({accountId: id}, [], null, function (err, user) {
            if (user.role == 1) {
                customerRepository.findOneBy({accountId: id}, [], null, function(err, customer){
                    user.customer = customer;
                    done(err, user);
                });
            } else if (user.role == 2) {
                supplierRepository.findOneBy({accountId: id}, [], null, function(err, supplier){
                    user.supplier = supplier;
                    done(err, user);
                });
            } else {
                done(err, user);
            }
            
        });
    });


    passport.use('login', new LocalStrategy({usernameField: 'userName', passwordField: 'password'},
        function (username, password, done) {
            var condition = {
                userName: username
            }
            accountRepository.findOneBy(condition, [], null, function (err, user) {
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