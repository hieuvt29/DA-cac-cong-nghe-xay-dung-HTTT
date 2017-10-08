var CategoryRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.Category = dbContext.Category;
}

CategoryRepository.prototype.findOneBy = function(condition, select, callback) {
    this.Category
        .findOne({
            attributes: select.length ? select : null,
            where: condition ? condition: null,
        })
        .then(function(result) {
            callback(null, result.dataValues);
        })
        .catch(function(err) {
            callback(err, null);
        });
}

CategoryRepository.prototype.findAllBy = function (condition, orderBy, select, page, limit, callback) {
    this.Category
        .findAll({
            attributes: select.length ? select : null,
            where: condition ? condition : null,
            order: orderBy ? orderBy : null,
            limit: limit,
            offset: page * limit
        })
        .then(function (result) {
            let res = result.map(function(val){
                return val.dataValues
            })
            callback(null, res);
        })
        .catch(function (err) {
            callback(err, null);
        });
}

CategoryRepository.prototype.save = function(categoryObj, callback) {
    this.Category
    .create(categoryObj)
    .then(function(result){
        callback(null, result.dataValues);
    })
    .catch(function(err){
        callback(err, null);
    })
}

CategoryRepository.prototype.update = function(categoryObj, callback) {
    this.Category
    .update(categoryObj, {
        where: { 'id' : categoryObj.categoryId}
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