var ProductRepository = function (dbContext) {
    this.dbContext = dbContext;
    this.Product = dbContext.Product;
}

ProductRepository.prototype.fulltextSearch = function (keywords, select, page, limit, callback) {
    var self = this;
    var association = [{
        model: self.dbContext.Category,
    }, {
        model: self.dbContext.Supplier,
    }]
    /* full get association
    "SELECT " + (select.length ? select.join(',') : '*') + ", `Categories`.*, `Categories-Products`.`createdAt` AS `Categories.Categories-Products.createdAt`,         `Categories-Products`.`updatedAt` AS `Categories.Categories-Products.updatedAt`,         `Categories-Products`.`categoryId` AS `Categories.Categories-Products.categoryId`,         `Categories-Products`.`productId` AS `Categories.Categories-Products.productId`,`Suppliers`.*, MATCH (Products.productName, Products.description) AGAINST (:keywords IN BOOLEAN MODE) AS score FROM  Products LEFT JOIN ( `Categories-Products` JOIN Categories ON Categories.categoryId = `Categories-Products`.categoryId) ON Products.productId = `Categories-Products`.productId LEFT JOIN Suppliers ON Products.supplierId = Suppliers.supplierId WHERE MATCH (Products.productName, Products.description) AGAINST (:keywords IN BOOLEAN MODE) AND Products.isActive = 1 AND Products.isDelete = 0 LIMIT :limit OFFSET :page"

    */
    var productFields = select.length ? select.reduce(function (pre, curr) {
        if (pre == "") {
            return "`Products`." + "`" + curr + "`";
        } else {
            return pre + "," + "`Products`." + "`" + curr + "`";
        }
    }, "") : "Products.*";
    var supplierAttr = Object.keys(self.dbContext.Supplier.rawAttributes);
    var supplierFields = supplierAttr.reduce(function (pre, curr) {
        if (pre == "") {
            return "`Suppliers`." + "`" + curr + "` AS `Supplier." + curr + "`";
        } else {
            return pre + "," + "`Suppliers`." + "`" + curr + "` AS `Supplier." + curr + "`";
        }
    }, "");
    var categoryAttr = Object.keys(self.dbContext.Category.rawAttributes);
    var categoryFields = categoryAttr.reduce(function (pre, curr) {
        if (pre == "") {
            return "`Categories`." + "`" + curr + "` AS `Categories." + curr + "`";
        } else {
            return pre + "," + "`Categories`." + "`" + curr + "` AS `Categories." + curr + "`";
        }
    }, "");

    var includeMap = Object.assign({}, {
        Supplier: {
            model: self.dbContext.Supplier,
            association: self.Product.Supplier
        }
    }, {
        Categories: {
            model: self.dbContext.Category,
            association: self.Product.Categories
        }
    });
    var includeNames = ["Supplier", "Categories"];

    var query = "SELECT " + productFields + "," + supplierFields + "," + categoryFields + "," + " MATCH (Products.productName, Products.description) AGAINST (:keywords IN BOOLEAN MODE) AS score FROM  Products LEFT JOIN ( `Categories-Products` JOIN Categories ON Categories.categoryId = `Categories-Products`.categoryId) ON Products.productId = `Categories-Products`.productId LEFT JOIN Suppliers ON Products.supplierId = Suppliers.supplierId WHERE MATCH (Products.productName, Products.description) AGAINST (:keywords IN BOOLEAN MODE) AND Products.isActive = 1 AND Products.isDelete = 0 LIMIT :limit OFFSET :page";
    var options = {
        replacements: {
            keywords: keywords,
            page: page,
            limit: limit
        },
        type: this.dbContext.sequelize.QueryTypes.SELECT,
        model: this.Product,
        include: association,
        includeMap: includeMap,
        includeNames: includeNames,
        hasJoin: true

    };
    self.dbContext.sequelize.query(query, options)
        .then(function (result) {
            if (result && result.length) {
                result.forEach(function (val) {
                    val.description ? val.description = JSON.parse(val.description) : null;
                })

                result.forEach(function (o) {
                    delete o.dataValues.isDelete;
                    delete o.dataValues.isActive;
                });
                callback(null, result);
            } else {
                callback(null, null);
            }

        })
        .catch(function (err) {
            callback(err, null);
        });
}

ProductRepository.prototype.findOneBy = function (condition, association, select, callback) {
    this.Product
        .findOne({
            attributes: select.length ? select : null,
            where: condition ? condition : null,
            include: association
        })
        .then(function (result) {
            if (result) {
                result.description ? result.description = JSON.parse(result.description) : null;
                delete result.dataValues.isDelete;
                delete result.dataValues.isActive;
                callback(null, result);
            } else {
                callback(null, null);
            }

        })
        .catch(function (err) {
            callback(err, null);
        });
}

ProductRepository.prototype.findAllBy = function (condition, association, orderBy, select, page, limit, callback) {
    this.Product
        .findAll({
            attributes: select.length ? select : null,
            where: condition ? condition : null,
            order: orderBy ? orderBy : null,
            limit: limit,
            offset: page * limit,
            include: association
        })
        .then(function (result) {
            if (result && result.length) {
                result.forEach(function (val) {
                    val.description ? val.description = JSON.parse(val.description) : null;
                });

                result.forEach(function (o) {
                    delete o.dataValues.isDelete;
                    delete o.dataValues.isActive;
                });
                callback(null, result);
            } else {
                callback(null, null);
            }

        })
        .catch(function (err) {
            callback(err, null);
        });
}

ProductRepository.prototype.save = function (productObj, association, callback) {
    productObj = Object.assign({},
        productObj, {
            description: productObj.description ? JSON.stringify(productObj.description) : null
        }
    )

    this.Product
        .create(productObj, {
            include: association
        })
        .then(function (result) {
            if (result) {
                result.description ? result.description = JSON.parse(result.description) : null;

                delete result.dataValues.isDelete;
                delete result.dataValues.isActive;
                callback(null, result);
            } else {
                callback(null, null);
            }

        })
        .catch(function (err) {
            callback(err, null);
        })
}

ProductRepository.prototype.saveWithTransaction = function (productProps, callback) {
    if (productProps.description) {
        productProps.description = JSON.stringify(productObj.description);
    }
    var self = this;
    var categoryIds = productProps.Categories.map(function (o) {
        return o.categoryId;
    });
    var sequelize = this.dbContext.sequelize;
    sequelize.transaction(function (t) {
        return self.Product
            .create(productProps, {
                transaction: t
            })
            .then(function (product) {
                productProps = product;
                return self.dbContext.Category
                    .findAll({
                        where: {
                            categoryId: categoryIds
                        },
                        transaction: t
                    })
                    .then(function (categorieObjs) {
                        productProps.dataValues.Categories = categorieObjs;
                        return product.setCategories(categorieObjs, {
                            transaction: t
                        });
                    })
            })
    }).then(function (result) {
        if (result) {
            productProps.description ? productProps.description = JSON.parse(productProps.description) : null;
            delete productProps.dataValues.isDelete;
            delete productProps.dataValues.isActive;
            return callback(null, productProps);
        } else {
            return callback(null, null);
        }
    }).catch(function (err) {
        return callback(err);
    })
}

ProductRepository.prototype.update = function (productObj, association, callback) {
    if (productObj.description) {
        productObj.description = JSON.stringify(productObj.description);
    }

    this.Product
        .update(productObj.dataValues, {
            where: {
                productId: productObj.productId
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

ProductRepository.prototype.updateWithTransaction = function (productObj, callback) {
    if (productObj.description) {
        productObj.description = JSON.stringify(productObj.description);
    }

    var self = this;
    var sequelize = this.dbContext.sequelize;
    var categoryIds = productObj.Categories.map(function (o) {
        return o.categoryId;
    });

    sequelize.transaction(function (t) {
        return self.Product
            .update(productObj.dataValues, {
                where: {
                    productId: productObj.productId
                },
                transaction: t
            })
            .then(function (updated) {
                if (updated) {
                    return self.dbContext.Category
                        .findAll({
                            where: {
                                categoryId: categoryIds
                            },
                            transaction: t
                        })
                        .then(function (categorieObjs) {
                            return productObj.setCategories(categorieObjs, {
                                transaction: t
                            });
                        })
                }

            })
    }).then(function (result) {
        if (result) {
            productObj.description ? productObj.description = JSON.parse(productObj.description) : null;
            delete productObj.dataValues.isDelete;
            delete productObj.dataValues.isActive;
            return callback(null, productObj);
        } else {
            return callback(null, null);
        }
    }).catch(function (err) {
        return callback(err);
    })
}

module.exports = ProductRepository;