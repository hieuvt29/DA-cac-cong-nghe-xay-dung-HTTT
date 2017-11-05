var dependencies = {
} // solve problem "this" keyword does not reference to this class

var ProductController = function (supplierService) {
    dependencies.supplierService = supplierService;

}

ProductController.prototype.getOne = function (req, res, next) {
    var supplierId = req.params.supplierId;

    dependencies.supplierService.getOne({ 'supplierId': supplierId }, [], function (err, supplier) {
        if (err) {
            next(err);
        } else {
            res.supplier = supplier;
            next();
        }
    })
}

ProductController.prototype.getMany = function (req, res, next) {
    var condition = req.where;
    var orderBy = req.options.sort;
    var select = req.fields ? req.fields : [];
    var page = req.options.skip;
    var limit = req.options.limit;

    dependencies.supplierService.getMany(condition, orderBy, select, page, limit, function (err, suppliers) {
        if (err) {
            next(err);
        } else {
            res.suppliers = suppliers;
            next();
        }
    })
}


ProductController.prototype.create = function (req, res, next) {
    var supplierProps = req.body;

    dependencies.supplierService.create(supplierProps, function (err, supplier) {
        if (err) {
            next(err);
        } else {
            res.supplier = supplier;
            next();
        }
    })
}

ProductController.prototype.update = function (req, res, next) {
    var supplierId = req.params.supplierId;
    var supplierProps = req.body;
    supplierProps.supplierId = supplierId;

    dependencies.supplierService.update(supplierProps, function (err, supplier) {
        if (err) {
            next(err);
        } else {
            res.supplier = supplier;
            next();
        }
    })
}

ProductController.prototype.delete = function (req, res, next) {
    var supplierId = req.params.supplierId;

    dependencies.supplierService.delete({ 'supplierId': supplierId }, function (err, result) {
        if (err) {
            next(err);
        } else {
            res.result = result;
            next();
        }
    })
}

module.exports = ProductController;