var nv = require('node-validator');
var rule = require('./validate/user-validator');

var OrderService = function (orderRepository) {
    this.orderRepository = orderRepository;
}
OrderService.prototype.getOne = function (condition, select, callback) {

    this.orderRepository.findOneBy(condition, select, null, function (err, result) {
        if (err) {
            return callback(err);
        } else if (result) {
            return callback(null, result);
        } else {
            return callback({
                type: "Not Found"
            });
        }
    })
}

OrderService.prototype.getMany = function (condition, orderBy, select, page, limit, callback) {

    this.orderRepository.findAllBy(condition, null, orderBy, select, page, limit, function (err, result) {
        if (err) {
            return callback(err);
        } else if (result) {
            return callback(null, result);
        } else {
            return callback({
                type: "Not Found"
            });
        }
    })
}

OrderService.prototype.create = async function (orderProps, callback) {
    var self = this;
    //validate props
    var val = await validate(rule.checkOrder, orderProps);
    if (val.numErr > 0){
        return callback({type: "Bad Request", error: val.error});
    }

    self.orderRepository.findOneBy({
        orderId: orderProps.orderId
    }, [], null, function (err, user) {
        if (err) {
            return callback(err);
        }
        if (!user) {
            self.orderRepository.save(orderProps, null, function (err, newOrder) {
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, newOrder);
                }
            })
        } else {
            callback({
                type: "Duplicated"
            });
        }
    })
}

OrderService.prototype.update = async function (orderProps, callback) {
    var self = this;
    //validate props
    var val = await validate(rule.checkOrder, orderProps);
    if (val.numErr > 0){
        return callback({type: "Bad Request", error: val.error});
    }

    self.orderRepository.findOneBy({
        orderId: orderProps.orderId
    }, [], null, function (err, orderObj) {
        if (err) {
            callback(err);
        } else if (orderObj) {
            orderObj = Object.assign({},
                orderObj,
                orderProps
            );
            self.orderRepository.update(orderObj, null, function (err, result) {
                if (err) {
                    callback(err);
                } else if (result) {
                    callback(null, orderObj)
                }
            })
        } else {
            callback({
                type: 'Not Found'
            });
        }
    })
}

function validate(rule, obj) {
    return new Promise(function (resolve, reject) {
        nv.run(rule, obj, function (numErr, err) {
            if (numErr) {
                console.error(err);
                return resolve({
                    numErr: numErr,
                    error: err
                });
            } else {
                return resolve({
                    numErr: 0
                })
            }
        });
    })
}
module.exports = OrderService;