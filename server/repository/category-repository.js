var CategoryRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.Category = dbContext.Category;
}

CategoryRepository.prototype.findBy = function(conditions, callback) {
    this.Category
    .findOne({
        where : conditions
    })
    .then(function(result){
        callback(null, result.dataValues);
    })
    .catch(function(err){
        callback(err, null);
    })
}

CategoryRepository.prototype.save = function(categoryObj, callback) {
    this.Category
    .create(categoryObj)
    .then(function(result){
        callback(null, result);
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