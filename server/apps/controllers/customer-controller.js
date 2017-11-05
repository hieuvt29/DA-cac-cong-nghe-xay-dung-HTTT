var dependencies = {
} // solve problem "this" keyword does not reference to this class

var ProductController = function (customerService) {
    dependencies.customerService = customerService;

}

ProductController.prototype.getOne = function (req, res, next) {
    var customerId = req.params.customerId;

    dependencies.customerService.getOne({ 'customerId': customerId }, [], function (err, customer) {
        if (err) {
            next(err);
        } else {
            res.customer = customer;
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

    dependencies.customerService.getMany(condition, orderBy, select, page, limit, function (err, customers) {
        if (err) {
            next(err);
        } else {
            res.customers = customers;
            next();
        }
    })
}


ProductController.prototype.create = function (req, res, next) {
    var customerProps = req.body;

    dependencies.customerService.create(customerProps, function (err, customer) {
        if (err) {
            next(err);
        } else {
            res.customer = customer;
            next();
        }
    })
}

ProductController.prototype.update = function (req, res, next) {
    var customerId = req.params.customerId;
    var customerProps = req.body;
    customerProps.customerId = customerId;

    dependencies.customerService.update(customerProps, function (err, customer) {
        if (err) {
            next(err);
        } else {
            res.customer = customer;
            next();
        }
    })
}

ProductController.prototype.delete = function (req, res, next) {
    var customerId = req.params.customerId;

    dependencies.customerService.delete({ 'customerId': customerId }, function (err, result) {
        if (err) {
            next(err);
        } else {
            res.result = result;
            next();
        }
    })
}

module.exports = ProductController;