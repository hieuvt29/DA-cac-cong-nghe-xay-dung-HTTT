var rule = require('../../common/validate/order-validator');
var validate = require('../../common/validate-function');
var orderState = require('../../common/order-states');

var dependencies = {} // solve problem "this" keyword does not reference to this class

var OrderController = function (orderRepository) {
    dependencies.orderRepository = orderRepository;
}

OrderController.prototype.getOne = function (req, res, next) {
    var select = req.fields ? req.fields : [];
    var orderId = req.params.orderId;

    var condition = {
        'orderId': orderId
    }

    var association = [{
        model: dependencies.orderRepository.dbContext.Product, 
        through: {
            attributes: ['orderQuantity', 'productId']
        }
    }];
    dependencies.orderRepository.findOneBy(condition, association, select, function (err, result) {
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

    var association = [{
        model: dependencies.orderRepository.dbContext.Product, 
        through: {
            attributes: ['orderQuantity', 'productId']
        }
    }];
    dependencies.orderRepository.findAllBy(condition, association, orderBy, select, page, limit, function (err, result) {
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
    var val = await validate(rule, orderProps);
    if (val.numErr > 0) {
        return next({
            type: "Bad Request",
            error: val.error
        });
    }

    if (!orderProps.total) {
        var total = 0;
        orderProps.Products.forEach(function(product) {
            total += product.price * product.orderQuantity;
        });
        orderProps.total = total;
    }
    dependencies.orderRepository.saveWithTransaction(orderProps, function (err, result) {
        if (err) {
            next(err);
        } else {
            res.order = result;
            next();
        }
    })
}

OrderController.prototype.update = async function (req, res, next) {
    var orderId = req.params.orderId;
    var orderProps = req.body;
    //validate props
    var val = await validate(rule, orderProps);
    if (val.numErr > 0) {
        return next({
            type: "Bad Request",
            error: val.error
        });
    }
    var condition = {
        orderId: orderId
    }

    dependencies.orderRepository.findOneBy(condition, [], [], function (err, orderObj) {
        if (err) {
            next(err);
        } else if (orderObj) {
            if (orderObj.state == orderState.CANCELLED) {
                return next({message: "Cannot change state of cancelled order"});
            }
            if (orderObj.state == orderState.DELIVERED) {
                return next({message: "Cannot change state of delivered order"});
            }
            orderObj = Object.assign({}, orderObj.dataValues, orderProps);
           
            dependencies.orderRepository.update(orderObj, [], function (err, result) {
                if (err) {
                    return next(err);
                } else {
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
/* 
OrderController.prototype.delete = async function (req, res, next) {
    var orderId = req.params.orderId;

    var condition = {
        orderId: orderProps.orderId
    }

    dependencies.orderRepository.findOneBy(condition, [], null, function (err, orderObj) {
        if (err) {
            return next(err);
        } else if (orderObj) {

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
} */

module.exports = OrderController;