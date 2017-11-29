var nv = require('node-validator');

var checkProduct = nv.isAnyObject()
    .withRequired('address', nv.isString())
    .withRequired('state', nv.isString({regex: /^.{1,20}$/}))
    .withOptional('orderId', nv.isString({regex: /^[a-zA-Z0-9_-]{36}$/}))
    .withOptional('customerId', nv.isString({regex: /^[a-zA-Z0-9_-]{36}$/}))
    .withOptional('createdAt', nv.isDate())
    .withOptional('deliveryDate', nv.isDate())
    
module.exports = checkProduct;