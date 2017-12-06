var OrderRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.Order = dbContext.Order;
}

OrderRepository.prototype.findOneBy = function(condition, select, association, callback) {
    this.Order
        .findOne({
            attributes: select.length ? select : null,
            where: condition ? condition: null,
            include: association
        })
        .then(function(result) {
            if (result){
                callback(null, result);
            } else {
                callback(null, null);
            }
            
        })
        .catch(function(err) {
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
            if (result){
                callback(null, result);
            } else {
                callback(null, null);
            }

        })
        .catch(function (err) {
            callback(err, null);
        });
}

OrderRepository.prototype.save = function(orderObj, association, callback) {
    this.Order
    .create(orderObj, {
        include: association
    })
    .then(function(result){
        if (result){   
            callback(null, result);
        } else {
            callback(null, null);
        }
    
    })
    .catch(function(err){
        callback(err, null);
    })
}

OrderRepository.prototype.update = function(orderObj, association, callback) {
    this.Order
    .update(orderObj, {
        where: { orderId : orderObj.orderId},
        include: association
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

module.exports = OrderRepository;