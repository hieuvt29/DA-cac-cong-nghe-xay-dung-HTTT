var nv = require('node-validator');

var checkOrder = nv.isAnyObject()
    .withRequired('address', nv.isString())
    .withRequired('state', nv.isString({regex: /^.{1,20}$/}))
    .withOptional('orderId', nv.isString({regex: /^[a-zA-Z0-9_-]{36}$/}))
    .withOptional('accountId', nv.isString({regex: /^[a-zA-Z0-9_-]{36}$/}))
    .withOptional('createdAt', nv.isDate())
    .withOptional('deliveryDate', nv.isDate())
    
module.exports = checkOrder;