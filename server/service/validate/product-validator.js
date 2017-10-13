var nv = require('node-validator');

var checkProduct = nv.isAnyObject()
    .withOptional('productId', nv.isString({regex: /^[a-zA-Z0-9_-]{36}$/}))
    .withOptional('categoryId', nv.isString({regex: /^[a-zA-Z0-9_-]{36}$/}))
    .withOptional('supplierId', nv.isString({regex: /^[a-zA-Z0-9_-]{36}$/}))
    .withRequired('price', nv.isNumber())
    .withRequired('productName', nv.isString({min: 10, max: 255}))
    .withOptional('quantity', nv.isInteger())
    .withOptional('views', nv.isInteger())
    .withOptional('image', nv.isString({max: 255}))
    .withOptional('description', nv.isAnyObject())
    .withOptional('createdAt', nv.isDate())
    .withOptional('isActive', nv.isBoolean())
    .withOptional('isDelete', nv.isBoolean())
    
module.exports = checkProduct;