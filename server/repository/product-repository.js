var ProductRepository = function (dbContext) {
    this.dbContext = dbContext;
    this.Product = dbContext.Product;
}

ProductRepository.prototype.fulltextSearch = function (keywords, association, select, page, limit, callback) {
    this.dbContext.sequelize.query(
        "SELECT " + (select.length?select.join(','):'*') +", MATCH (productName, description) AGAINST (:keywords IN BOOLEAN MODE) AS score FROM Products WHERE isActive = 1 AND isDelete = 0 AND MATCH (productName, description) AGAINST (:keywords IN BOOLEAN MODE) LIMIT :limit OFFSET :page ", {
            replacements: {
                keywords: keywords,
                page: page,
                limit: limit
            },
            type: this.dbContext.sequelize.QueryTypes.SELECT,
            model: this.Product
        }).then(function (result) {
            if (result && result.length) {
                let res = result.map(function (val) {
                    val.description ? val.description = JSON.parse(val.description) : null;
                    return val.dataValues
                })
                callback(null, res);
            } else {
                callback(null, null);
            }

        })
        .catch(function (err) {
            callback(err, null);
        });
}

ProductRepository.prototype.findOneBy = function (condition, select, association, callback) {
    this.Product
        .findOne({
            attributes: select.length ? select : null,
            where: condition ? condition : null,
            include: association
        })
        .then(function (result) {
            if (result) {
                result.description ? result.description = JSON.parse(result.description) : null;
                callback(null, result.dataValues);
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
                let res = result.map(function (val) {
                    val.description ? val.description = JSON.parse(val.description) : null;
                    return val.dataValues
                })
                callback(null, res);
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
                callback(null, result.dataValues);
            } else {
                callback(null, null);
            }

        })
        .catch(function (err) {
            callback(err, null);
        })
}

ProductRepository.prototype.update = function (productObj, association, callback) {
    productObj = Object.assign({},
        productObj, {
            description: productObj.description ? JSON.stringify(productObj.description) : null
        }
    )

    this.Product
        .update(productObj, {
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

module.exports = ProductRepository;