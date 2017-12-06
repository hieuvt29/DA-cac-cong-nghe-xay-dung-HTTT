var rule = require('../../common/validate/user-validator');
var validate = require('../../common/validate-function');

var dependencies = {} // solve problem "this" keyword does not reference to this class

var OrderController = function (orderRepository) {
    dependencies.orderRepository = orderRepository;
}

OrderController.prototype.getOne = function (req, res, next) {
    var orderId = req.params.orderId;

    var condition = {
        'orderId': orderId
    }
    condition.isDelete = false;

    dependencies.orderRepository.findOneBy(condition, select, null, function (err, result) {
        if (err) {
            return next(err);
        } else if (result) {
            res.order = result;
            return next();
        } else {
            return next({
                type: "Not Found"
            });
        }
    })
}

OrderController.prototype.getMany = function (req, res, next) {
    var condition = req.where;
    var orderBy = req.options.sort;
    var select = req.fields ? req.fields : [];
    var page = req.options.skip;
    var limit = req.options.limit;

    condition.isDelete = false;

    dependencies.orderRepository.findAllBy(condition, null, orderBy, select, page, limit, function (err, result) {
        if (err) {
            return next(err);
        } else if (result) {
            res.orders = result;
            return next();
        } else {
            return next({
                type: "Not Found"
            });
        }
    })
}


OrderController.prototype.create = async function (req, res, next) {
    var orderProps = req.body;

    //validate props
    var val = await validate(rule.checkOrder, orderProps);
    if (val.numErr > 0) {
        return next({
            type: "Bad Request",
            error: val.error
        });
    }

    dependencies.orderRepository.findOneBy({
        'accountId': orderProps.accountId
    }, [], null, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            dependencies.orderRepository.save(orderProps, null, function (err, newOrder) {
                if (err) {
                    return next(err);
                } else {
                    res.order = newOrder;
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

OrderController.prototype.update = async function (req, res, next) {
    var orderId = req.params.orderId;
    var orderProps = req.body;
    orderProps.orderId = orderId;

    //validate props
    var val = await validate(rule.checkOrder, orderProps);
    if (val.numErr > 0) {
        return next({
            type: "Bad Request",
            error: val.error
        });
    }

    dependencies.orderRepository.findOneBy({
        orderId: orderProps.orderId
    }, [], null, function (err, orderObj) {
        if (err) {
            next(err);
        } else if (orderObj) {
            orderObj = Object.assign({},
                orderObj,
                orderProps
            );
            dependencies.orderRepository.update(orderObj, null, function (err, result) {
                if (err) {
                    next(err);
                } else if (result) {
                    res.order = orderObj;
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

OrderController.prototype.delete = async function (req, res, next) {
    var orderId = req.params.orderId;

    var val = await validate(rule.checkOrder, orderProps);
    if (val.numErr > 0) {
        return next({
            type: "Bad Request",
            error: val.error
        });
    }

    var condition = {
        orderId: orderProps.orderId,
        isDelete: false
    }

    dependencies.orderRepository.findOneBy(condition, [], null, function (err, orderObj) {
        if (err) {
            return next(err);
        } else if (orderObj) {
            orderProps.isDelete = true;
            orderObj = Object.assign({}, orderObj, orderProps);

            dependencies.orderRepository.update(orderObj, null, function (err, result) {
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

module.exports = OrderController;