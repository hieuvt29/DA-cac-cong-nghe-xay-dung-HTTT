var ProductRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.Product = dbContext.Product;
}

ProductRepository.prototype.findOneBy = function(condition, select, callback) {
    this.Product
        .findOne({
            attributes: select.length ? select : null,
            where: condition ? condition: null,
        })
        .then(function(result) {
            if (result){
                result.description ? result.description = JSON.parse(result.description) : null;
                callback(null, result.dataValues);
            } else {
                callback(null, null);
            }
            
        })
        .catch(function(err) {
            callback(err, null);
        });
}

ProductRepository.prototype.findAllBy = function (condition, orderBy, select, page, limit, callback) {
    this.Product
        .findAll({
            attributes: select.length ? select : null,
            where: condition ? condition : null,
            order: orderBy ? orderBy : null,
            limit: limit,
            offset: page * limit
        })
        .then(function (result) {
            if (result){
                let res = result.map(function(val){
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

ProductRepository.prototype.save = function(productObj, callback) {
    productObj = Object.assign(
        {}, 
        productObj, 
        {description: productObj.description ? JSON.stringify(productObj.description) : null}
    )
    
    this.Product
    .create(productObj)
    .then(function(result){
        if (result){
            result.description ? result.description = JSON.parse(result.description) : null;      
            callback(null, result.dataValues);
        } else {
            callback(null, null);
        }
    
    })
    .catch(function(err){
        callback(err, null);
    })
}

ProductRepository.prototype.update = function(productObj, callback) {
    productObj = Object.assign(
        {}, 
        productObj, 
        {description: productObj.description ? JSON.stringify(productObj.description) : null}
    )
    
    this.Product
    .update(productObj, {
        where: { productId : productObj.productId}
    })
    .then(function(result){
        if(result.every(function(val){
            return val == 1;
        })){
            callback(null, true);
        }else{
            callback(null, false);
        }
    })
    .catch(function(err){
        callback(err, null);
    })
}

module.exports = ProductRepository;