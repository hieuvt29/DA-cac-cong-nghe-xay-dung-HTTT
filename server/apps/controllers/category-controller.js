var rule = require('../../common/validate/category-validator');
var validate = require('../../common/validate-function');

var dependencies = {} // solve problem "this" keyword does not reference to this class

var CategoryController = function (categoryRepository) {
    dependencies.categoryRepository = categoryRepository;
}

CategoryController.prototype.getOne = function (req, res, next) {
    var condition = req.where;
    var select = req.fields ? req.fields : [];
    var categoryId = req.params.categoryId;

    condition.categoryId = categoryId;
    condition.isDelete = false;

    var association = [];
    if (condition.association) {
        association = [{
            model: dependencies.categoryRepository.dbContext.Product
        }];
        delete condition.association;
    }

    dependencies.categoryRepository.findOneBy(condition, association, [], function (err, result) {
        if (err) {
            return next(err);
        } else if (result) {
            res.category = result;
            return next();
        } else {
            return next({
                type: "Not Found"
            });
        }
    })
}

CategoryController.prototype.getMany = function (req, res, next) {
    var condition = req.where;
    var orderBy = req.options.sort;
    var select = req.fields ? req.fields : [];
    var page = req.options.skip;
    var limit = req.options.limit;

    condition.isDelete = false;

    var association = [];
    if (condition.association) {
        association = [{
            model: dependencies.categoryRepository.dbContext.Product
        }];
        delete condition.association;
    }

    dependencies.categoryRepository.findAllBy(condition, association, orderBy, select, page, limit, function (err, result) {
        if (err) {
            return next(err);
        } else if (result) {
            res.categories = result;
            return next();
        } else {
            return next({
                type: "Not Found"
            });
        }
    })
}


CategoryController.prototype.create = async function (req, res, next) {
    var categoryProps = req.body;

    //validate props
    var val = await validate(rule, categoryProps);
    if (val.numErr > 0) {
        return next({
            type: "Bad Request",
            error: val.error
        });
    }

    dependencies.categoryRepository.findOneBy({
        'categoryId': categoryProps.categoryId
    }, [], [], function (err, category) {
        if (err) {
            return next(err);
        }
        if (!category) {
            dependencies.categoryRepository.save(categoryProps, null, function (err, newCategory) {
                if (err) {
                    return next(err);
                } else {
                    res.category = newCategory;
                    return next();
                }
            })
        } else {
            next({
                type: "Duplicated"
            });
        }
    })
}

CategoryController.prototype.update = async function (req, res, next) {
    var categoryId = req.params.categoryId;
    var categoryProps = req.body;
    categoryProps.categoryId = categoryId;

    //validate props
    var val = await validate(rule, categoryProps);
    if (val.numErr > 0) {
        return next({
            type: "Bad Request",
            error: val.error
        });
    }

    dependencies.categoryRepository.findOneBy({
        categoryId: categoryProps.categoryId
    }, [], [], function (err, categoryObj) {
        if (err) {
            next(err);
        } else if (categoryObj) {
            categoryObj = Object.assign({},
                categoryObj.dataValues,
                categoryProps
            );
            dependencies.categoryRepository.update(categoryObj, null, function (err, result) {
                if (err) {
                    next(err);
                } else if (result) {
                    res.category = categoryObj;
                    return next();
                }
            })
        } else {
            next({
                type: 'Not Found'
            });
        }
    })
}

CategoryController.prototype.delete = async function (req, res, next) {
    var categoryId = req.params.categoryId;

    var condition = {
        categoryId: categoryId,
        isDelete: false
    }

    dependencies.categoryRepository.findOneBy(condition, [], [], function (err, categoryObj) {
        if (err) {
            return next(err);
        } else if (categoryObj) {
            categoryObj.isDelete = true;

            dependencies.categoryRepository.update(categoryObj.dataValues, null, function (err, result) {
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

module.exports = CategoryController;