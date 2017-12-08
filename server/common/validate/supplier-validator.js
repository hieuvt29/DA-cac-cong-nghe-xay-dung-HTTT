var nv = require('node-validator');

var checkSupplier = nv.isAnyObject()
    .withRequired('supplierName', nv.isString())
    .withOptional('address', nv.isString())
    .withOptional('type', nv.isString())
    .withOptional('contact', nv.isString())
    
module.exports = checkSupplier;