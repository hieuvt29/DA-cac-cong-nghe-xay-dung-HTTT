var nv = require('node-validator');

var checkOrder = nv.isAnyObject()
    .withRequired('address', nv.isString({regex: /^.{4,}$/}))
    .withRequired('telephone', nv.isString({regex: /^[0-9]{10,20}$/}))
    .withRequired('Products', nv.isArray())
    .withOptional('state', nv.isString({regex: /^.{1,20}$/}))
    .withOptional('orderId', nv.isString({regex: /^[a-zA-Z0-9_-]{36}$/}))
    .withOptional('accountId', nv.isString({regex: /^[a-zA-Z0-9_-]{36}$/}))
    .withOptional('createdAt', nv.isDate())
    .withOptional('deliveryDate', nv.isDate())
    .withOptional('total', nv.isNumber())
    
module.exports = checkOrder;