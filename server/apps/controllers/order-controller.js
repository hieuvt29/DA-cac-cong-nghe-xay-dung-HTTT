var dependencies = {
} // solve problem "this" keyword does not reference to this class

var OrderController = function (orderService) {
    dependencies.orderService = orderService;

}

OrderController.prototype.getOne = function (req, res, next) {
    var orderId = req.params.orderId;

    dependencies.orderService.getOne({ 'orderId': orderId }, [], function (err, order) {
        if (err) {
            next(err);
        } else {
            res.order = order;
            next();
        }
    })
}

OrderController.prototype.getMany = function (req, res, next) {
    var condition = req.where;
    var orderBy = req.options.sort;
    var select = req.fields ? req.fields : [];
    var page = req.options.skip;
    var limit = req.options.limit;

    dependencies.orderService.getMany(condition, orderBy, select, page, limit, function (err, orders) {
        if (err) {
            next(err);
        } else {
            res.orders = orders;
            next();
        }
    })
}

OrderController.prototype.create = function (req, res, next) {
    var orderProps = req.body;

    dependencies.orderService.create(orderProps, function (err, order) {
        if (err) {
            next(err);
        } else {
            res.order = order;
            next();
        }
    })
}

OrderController.prototype.update = function (req, res, next) {
    var orderId = req.params.orderId;
    var orderProps = req.body;
    orderProps.orderId = orderId;

    dependencies.orderService.update(orderProps, function (err, order) {
        if (err) {
            next(err);
        } else {
            res.order = order;
            next();
        }
    })
}

OrderController.prototype.delete = function (req, res, next) {
    var orderId = req.params.orderId;

    dependencies.orderService.delete({ 'orderId': orderId }, function (err, result) {
        if (err) {
            next(err);
        } else {
            res.result = result;
            next();
        }
    })
}

module.exports = OrderController;