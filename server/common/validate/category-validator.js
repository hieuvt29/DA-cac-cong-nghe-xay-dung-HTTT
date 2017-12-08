var nv = require('node-validator');

var checkCategory = nv.isAnyObject()
    .withRequired('categoryName', nv.isString())
    .withOptional('description', nv.isString())
    .withOptional('categoryId', nv.isString({regex: /^[a-zA-Z0-9_-]{36}$/}))
    .withOptional('parentId', nv.isString({regex: /^[a-zA-Z0-9_-]{36}$/}))
    
module.exports = checkCategory;