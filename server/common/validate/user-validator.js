var nv = require('node-validator');

var checkAccount = nv.isAnyObject()
    .withRequired('userName', nv.isString({regex: /^.{4,255}/}))
    .withRequired('password', nv.isString({regex: /^.{4,}$/}))
    .withRequired('firstName', nv.isString({regex: /^.{0,50}/}))
    .withRequired('lastName', nv.isString({regex: /^.{0,50}/}))
    .withRequired('email', nv.isString({regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}))
    .withOptional('gender', nv.isString({regex: /^.{0,10}/}))
    .withOptional('accountId', nv.isString({regex: /^[a-zA-Z0-9_-]{36}$/}))
    .withOptional('role', nv.isInteger())
    .withOptional('telephone', nv.isString({regex: /^[0-9]{10,20}$/}))
    // .withOptional('dob', nv.isDate())
    .withOptional('address', nv.isString({ regex: /^.+$/ }))
    // .withOptional('createdAt', nv.isDate())
    .withOptional('isActive', nv.isBoolean())
    .withOptional('isDelete', nv.isBoolean());

module.exports = checkAccount;