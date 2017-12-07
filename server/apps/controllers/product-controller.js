var rule = require('../../common/validate/product-validator');
var validate = require('../../common/validate-function');

var dependencies = {} // solve problem "this" keyword does not reference to this class

var ProductController = function (productRepository, categoryRepository, supplierRepository) {
    dependencies.productRepository = productRepository;
    dependencies.categoryRepository = categoryRepository;
    dependencies.supplierRepository = productRepository;
}

ProductController.prototype.getOne = function (req, res, next) {
    var select = req.fields ? req.fields : [];
    var productId = req.params.productId;

    var condition = {
        productId: productId
    }
    condition.isDelete = false;
    condition.isActive = true;

    var association = [{
        model: dependencies.productRepository.dbContext.Category,
    },{
        model: dependencies.productRepository.dbContext.Supplier,
    }]

    dependencies.productRepository.findOneBy(condition, association, select, function (err, result) {
        if (err) {
            return next(err);
        } else if (result) {
            result = result.dataValues;
            res.product = result;
            return next();
        } else {
            return next({
                type: "Not Found"
            });
        }
    })
}

ProductController.prototype.fulltextSearch = function (req, res, next) {
    var condition = req.where;
    var select = req.fields ? req.fields : [];
    var page = req.options.skip;
    var limit = req.options.limit;

    var keywords = condition.keywords;

    dependencies.productRepository.fulltextSearch(keywords, select, page, limit, function (err, result) {
        if (err) {
            return next(err);
        } else if (result) {
            result = result.map(function(val){
                return val.dataValues;
            })
            res.products = result;
            return next();
        } else {
            return next({
                type: "Not Found"
            });
        }
    })
}

ProductController.prototype.getMany = function (req, res, next) {
    var condition = req.where;
    var orderBy = req.options.sort;
    var select = req.fields ? req.fields : [];
    var page = req.options.skip;
    var limit = req.options.limit;


    condition.isDelete = false;
    condition.isActive = true;
    // HANDLE SEARCHING BY RANGE OF PRICE
    if (condition.minPrice | condition.maxPrice) {
        condition['price'] = Object.assign({}, condition['price'], {
            $gte: condition.minPrice,
            $lte: condition.maxPrice
        });
        delete condition.minPrice;
        delete condition.maxPrice;
    }
    // // HANDLE SEARCHING BY CATEGORYID
    // var categoryCondition = {};
    // if (condition.categoryId) {
    //     categoryCondition = {
    //         categoryId: condition.categoryId
    //     };
    //     delete condition.categoryId;
    // }
    var association = [{
        model: dependencies.productRepository.dbContext.Category
    },{
        model: dependencies.productRepository.dbContext.Supplier,
    }]

    dependencies.productRepository.findAllBy(condition, association, orderBy, select, page, limit, function (err, result) {
        if (err) {
            return next(err);
        } else if (result) {
            result = result.map(function(val){
                return val.dataValues;
            });
            res.products = result;
            return next();
        } else {
            return next({
                type: "Not Found"
            });
        }
    })
}

ProductController.prototype.create = async function (req, res, next) {
    var productProps = req.body;

    var val = await validate(rule, productProps);
    if (val.numErr > 0) {
        return next({
            type: "Bad Request",
            error: val.error
        });
    }

    dependencies.productRepository.saveWithTransaction(productProps, function(err, result){
        if (err){
            next(err);
        } else {
            res.product = result;
            next();
        }
    })
    /* dependencies.productRepository.save(productProps, null, function (err, result) {
        if (err) {
            return next(err);
        } else if (result) {
            result.setCategories({
                categoryId: result.categoryId
            }).then(function (res1) {
                console.log("ok");
                res.product = result;
                return next();
            }).catch(function (err) {
                if (err) {
                    return next(err);
                }
            })
        } else {
            return next({
                type: "Bad Request"
            });
        }
    }); */
}

ProductController.prototype.update = async function (req, res, next) {
    var productId = req.params.productId;
    var productProps = req.body;
    productProps.productId = productId;

    var val = await validate(rule, productProps);
    if (val.numErr > 0) {
        return next({
            type: "Bad Request",
            error: val.error
        });
    }

    var condition = {
        productId: productProps.productId,
        isActive: true,
        isDelete: false
    }

    var association = [{
        model: dependencies.productRepository.dbContext.Category,
    },{
        model: dependencies.productRepository.dbContext.Supplier,
    }]

    dependencies.productRepository.findOneBy(condition, association, [], function (err, productObj) {
        if (err) {
            return next(err);
        } else if (productObj) {
            productObj.dataValues = Object.assign({}, productObj.dataValues, productProps);

            dependencies.productRepository.updateWithTransaction(productObj, function(err, result){
                if (err){
                    return next(err);
                } else {
                    res.product = productObj.dataValues;
                    return next();
                }
            })
            /* dependencies.productRepository.update(productObj, null, function (err, result) {
                if (err) {
                    return next(err);
                } else if (result) {
                    res.product = productObj;
                    return next();
                } else {
                    return next({
                        type: 'Bad Request'
                    });
                }
            }) */
        } else {
            return next({
                type: 'Not Found'
            });
        }
    })
}

ProductController.prototype.delete = async function (req, res, next) {
    var productId = req.params.productId;

    var condition = {
        productId: productId,
        isActive: true,
        isDelete: false
    }

    dependencies.productRepository.findOneBy(condition, [], [], function (err, productObj) {
        if (err) {
            return next(err);
        } else if (productObj) {
            productObj.isDelete = true;

            dependencies.productRepository.update(productObj, null, function (err, result) {
                if (err) {
                    return next(err);
                } else if (result) {
                    return next({
                        type: "Deleted"
                    });
                } else {
                    return next({
                        type: 'Bad Request'
                    });
                }
            })
        } else {
            return next({
                type: 'Not Found'
            });
        }
    })
}

module.exports = ProductController;