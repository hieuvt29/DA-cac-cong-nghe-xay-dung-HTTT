var nv = require('node-validator');

var checkProduct = nv.isAnyObject()
    .withRequired('price', nv.isNumber())
    .withRequired('productName', nv.isString({regex: /^.{10,255}/}))
    .withRequired('Categories', nv.isArray())
    .withRequired('supplierId', nv.isString({regex: /^[a-zA-Z0-9_-]{36}$/}))
    .withOptional('productId', nv.isString({regex: /^[a-zA-Z0-9_-]{36}$/}))
    .withOptional('quantity', nv.isInteger())
    .withOptional('views', nv.isInteger())
    .withOptional('image', nv.isString({regex: /.{5,255}/}))
    .withOptional('description', nv.isAnyObject())
    // .withOptional('createdAt', nv.isDate())
    .withOptional('isActive', nv.isBoolean())
    .withOptional('isDelete', nv.isBoolean())
    
module.exports = checkProduct;