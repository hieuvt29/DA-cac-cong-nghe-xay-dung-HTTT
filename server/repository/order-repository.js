var OrderRepository = function (dbContext) {
    this.dbContext = dbContext;
    this.Order = dbContext.Order;
}

OrderRepository.prototype.findOneBy = function (condition, association, select, callback) {
    this.Order
        .findOne({
            attributes: select.length ? select : null,
            where: condition ? condition : null,
            include: association
        })
        .then(function (result) {
            if (result) {
                callback(null, result);
            } else {
                callback(null, null);
            }

        })
        .catch(function (err) {
            callback(err, null);
        });
}

OrderRepository.prototype.findAllBy = function (condition, association, orderBy, select, page, limit, callback) {
    this.Order
        .findAll({
            attributes: select.length ? select : null,
            where: condition ? condition : null,
            order: orderBy ? orderBy : null,
            limit: limit,
            offset: page * limit,
            include: association
        })
        .then(function (result) {
            if (result) {
                callback(null, result);
            } else {
                callback(null, null);
            }

        })
        .catch(function (err) {
            callback(err, null);
        });
}

OrderRepository.prototype.save = function (orderObj, association, callback) {
    this.Order
        .create(orderObj, {
            include: association
        })
        .then(function (result) {
            if (result) {
                callback(null, result);
            } else {
                callback(null, null);
            }

        })
        .catch(function (err) {
            callback(err, null);
        })
}

OrderRepository.prototype.saveWithTransaction = function (orderProps, callback) {
    var self = this;
    var orderProducts = orderProps.Products;
    var productIds = orderProducts.map(function (o) {
        return o.productId;
    });
    var sequelize = this.dbContext.sequelize;
    sequelize.transaction(function (t) {
        return self.Order
            .create(orderProps, {
                transaction: t
            })
            .then(function (order) {
                orderProps = order;
                return self.dbContext.Product
                    .findAll({
                        attributes: ["productId", "productName"],
                        where: {
                            productId: productIds
                        },
                        transaction: t
                    })
                    .then(function (productObjs) {
                        if (productObjs.length == 0) {
                            throw new Error("Bad Request");
                        } else {
                            orderProps.dataValues.Products = productObjs;
                            // map each product with its orderQuantity
                            productObjs.forEach(function (productObj) {
                                orderProducts.forEach(function (productProps) {
                                    if (productProps.productId == productObj.productId) {
                                        productObj['Orders-Products'] = {
                                            orderQuantity: productProps.orderQuantity
                                        };
                                        productObj.dataValues.orderQuantity = productProps.orderQuantity;
                                    }
                                })
                            })
                            // Create relationships
                            return order.setProducts(productObjs, {
                                transaction: t,
                                through: {
                                    orderQuantity: 0
                                }
                            });
                        }

                    })
            })
    }).then(function (result) {
        if (result) {
            return callback(null, orderProps);
        } else {
            return callback(null, null);
        }
    }).catch(function (err) {
        return callback({type: err.message});
    })
}

OrderRepository.prototype.update = function (orderObj, association, callback) {
    this.Order
        .update(orderObj, {
            where: {
                orderId: orderObj.orderId
            },
            include: association
        })
        .then(function (result) {
            if (result.every(function (val) {
                    return val == 1;
                })) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        })
        .catch(function (err) {
            callback(err, null);
        })
}

OrderRepository.prototype.updateWithTransaction = function (orderObj, callback) {
    var self = this;
    var productIds = orderObj.Products.map(function (o) {
        return o.productId;
    });
    var sequelize = this.dbContext.sequelize;
    sequelize.transaction(function (t) {
        return self.Order
            .update(orderObj.dataValues, {
                where: {
                    orderId: orderObj.orderId
                },
                transaction: t
            })
            .then(function (updated) {
                if (updated) {
                    return self.dbContext.Product
                        .findAll({
                            attributes: ["productId", "productName"],
                            where: {
                                productId: productIds
                            },
                            transaction: t
                        })
                        .then(function (productObjs) {
                            orderObj.dataValues.Products = productObjs;
                            // map each product with its orderQuantity
                            productObjs.forEach(function (productObj) {
                                orderObj.Products.forEach(function (productProps) {
                                    if (orderObj.productId == productObj.productId) {
                                        productObj['Orders-Products'] = {
                                            orderQuantity: productProps.orderQuantity
                                        };
                                        productObj.dataValues.orderQuantity = productProps.orderQuantity;
                                    }
                                })
                            })
                            // Create relationships
                            return orderObj.setProducts(productObjs, {
                                transaction: t,
                                through: {
                                    orderQuantity: 0
                                }
                            });
                        })
                }

            })
    }).then(function (result) {
        if (result) {
            return callback(null, orderObj);
        } else {
            return callback(null, null);
        }
    }).catch(function (err) {
        return callback(err);
    })
}

module.exports = OrderRepository;