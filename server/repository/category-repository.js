var CategoryRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.Category = dbContext.Category;
}

CategoryRepository.prototype.findOneBy = function(condition, select, association, callback) {
    this.Category
        .findOne({
            attributes: select.length ? select : null,
            where: condition ? condition: null,
            include: association
        })
        .then(function(result) {
            if (result){
                delete result.dataValues.isDelete;
                callback(null, result);
            } else {
                callback(null, null);
            }
            
        })
        .catch(function(err) {
            callback(err, null);
        });
}

CategoryRepository.prototype.findAllBy = function (condition, association, orderBy, select, page, limit, callback) {
    this.Category
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
                result.forEach(function (o) {
                    delete o.dataValues.isDelete;
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

CategoryRepository.prototype.save = function(categoryObj, association, callback) {
    this.Category
    .create(categoryObj, {
        include: association
    })
    .then(function(result){
        if (result){   
            delete result.dataValues.isDelete;
            callback(null, result);
        } else {
            callback(null, null);
        }
    
    })
    .catch(function(err){
        callback(err, null);
    })
}

CategoryRepository.prototype.update = function(categoryObj, association, callback) {
    this.Category
    .update(categoryObj, {
        where: { categoryId : categoryObj.categoryId},
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

module.exports = CategoryRepository;