var rule = require('../../common/validate/user-validator');
var validate = require('../../common/validate-function');

var dependencies = {} // solve problem "this" keyword does not reference to this class

var SupplierController = function (supplierRepository) {
    dependencies.supplierRepository = supplierRepository;
}

SupplierController.prototype.getOne = function (req, res, next) {
    var supplierId = req.params.supplierId;

    var condition = {
        'supplierId': supplierId
    }
    condition.isDelete = false;

    dependencies.supplierRepository.findOneBy(condition, select, null, function (err, result) {
        if (err) {
            return next(err);
        } else if (result) {
            res.supplier = result;
            return next();
        } else {
            return next({
                type: "Not Found"
            });
        }
    })
}

SupplierController.prototype.getMany = function (req, res, next) {
    var condition = req.where;
    var orderBy = req.options.sort;
    var select = req.fields ? req.fields : [];
    var page = req.options.skip;
    var limit = req.options.limit;

    condition.isDelete = false;

    dependencies.supplierRepository.findAllBy(condition, null, orderBy, select, page, limit, function (err, result) {
        if (err) {
            return next(err);
        } else if (result) {
            res.suppliers = result;
            return next();
        } else {
            return next({
                type: "Not Found"
            });
        }
    })
}


SupplierController.prototype.create = async function (req, res, next) {
    var supplierProps = req.body;

/*     //validate props
    var val = await validate(rule.checkSupplier, supplierProps);
    if (val.numErr > 0) {
        return next({
            type: "Bad Request",
            error: val.error
        });
    } */

    dependencies.supplierRepository.findOneBy({
        'accountId': supplierProps.accountId
    }, [], null, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            dependencies.supplierRepository.save(supplierProps, null, function (err, newSupplier) {
                if (err) {
                    return next(err);
                } else {
                    res.supplier = newSupplier;
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

SupplierController.prototype.update = async function (req, res, next) {
    var supplierId = req.params.supplierId;
    var supplierProps = req.body;
    supplierProps.supplierId = supplierId;

    //validate props
    var val = await validate(rule.checkSupplier, supplierProps);
    if (val.numErr > 0) {
        return next({
            type: "Bad Request",
            error: val.error
        });
    }

    dependencies.supplierRepository.findOneBy({
        supplierId: supplierProps.supplierId
    }, [], null, function (err, supplierObj) {
        if (err) {
            next(err);
        } else if (supplierObj) {
            supplierObj = Object.assign({},
                supplierObj,
                supplierProps
            );
            dependencies.supplierRepository.update(supplierObj, null, function (err, result) {
                if (err) {
                    next(err);
                } else if (result) {
                    res.supplier = supplierObj;
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

SupplierController.prototype.delete = async function (req, res, next) {
    var supplierId = req.params.supplierId;

    var val = await validate(rule.checkSupplier, supplierProps);
    if (val.numErr > 0) {
        return next({
            type: "Bad Request",
            error: val.error
        });
    }

    var condition = {
        supplierId: supplierProps.supplierId,
        isDelete: false
    }

    dependencies.supplierRepository.findOneBy(condition, [], null, function (err, supplierObj) {
        if (err) {
            return next(err);
        } else if (supplierObj) {
            supplierProps.isDelete = true;
            supplierObj = Object.assign({}, supplierObj, supplierProps);

            dependencies.supplierRepository.update(supplierObj, null, function (err, result) {
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

module.exports = SupplierController;