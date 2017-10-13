var nv = require('node-validator');

var checkAccount = nv.isAnyObject()
    .withRequired('userName', nv.isString({min: 5, max: 255}))
    .withOptional('accountId', nv.isString({regex: /^[a-zA-Z0-9_-]{36}$/}))
    .withOptional('role', nv.isInteger())
    .withOptional('createdAt', nv.isDate())
    .withOptional('isActive', nv.isBoolean())
    .withOptional('isDelete', nv.isBoolean());

var checkCustomer = nv.isAnyObject()
.withRequired('firstName', nv.isString({min: 1, max: 20}))
.withRequired('lastName', nv.isString({min: 1, max: 20}))
.withRequired('gender', nv.isString({min: 1, max: 10}))
.withRequired('email', nv.isEmail())
.withOptional('customerId', nv.isString({regex: /^[a-zA-Z0-9_-]{36}$/}))
.withOptional('accountId', nv.isString({regex: /^[a-zA-Z0-9_-]{36}$/}))
.withOptional('telephone', nv.isString({regex: /^[0-9]{10,20}$/}))
.withOptional('dob', nv.isDate())
.withRequired('address', nv.isString({ regex: /^.+$/ }))
.withOptional('createdAt', nv.isDate())
.withOptional('isActive', nv.isBoolean())
.withOptional('isDelete', nv.isBoolean());

var checkSupplier = nv.isAnyObject()
.withRequired('supplierName', nv.isString({min: 5, max: 200}))
.withRequired('email', nv.isEmail())
.withOptional('supplierId', nv.isString({regex: /^[a-zA-Z0-9_-]{36}$/}))
.withOptional('accountId', nv.isString({regex: /^[a-zA-Z0-9_-]{36}$/}))
.withOptional('type', nv.isString({regex: /^[0-9]{4,50}$/}))
.withRequired('address', nv.isString({ regex: /^.+$/ }))
.withOptional('createdAt', nv.isDate())
.withOptional('isActive', nv.isBoolean())
.withOptional('isDelete', nv.isBoolean());

module.exports = {
    checkAccount: checkAccount,
    checkCustomer: checkCustomer,
    checkSupplier: checkSupplier
}