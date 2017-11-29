
var CategoryService = function (categoryRepository) {
    this.categoryRepository = categoryRepository;
}

CategoryService.prototype.getOne = function (condition, select, callback) {
    condition.isDelete = false;

    this.categoryRepository.findOneBy(condition, select, [], function (err, result) {
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

CategoryService.prototype.getMany = function (condition, orderBy, select, page, limit, callback) {
    condition.isDelete = false;

    this.categoryRepository.findAllBy(condition, null, orderBy, select, page, limit, function (err, result) {
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

CategoryService.prototype.create = async function (categoryProps, callback) {

    this.categoryRepository.save(categoryProps, null, function (err, result) {
        if (err) {
            return callback(err);
        } else if (result) {
            return callback(null, result);
        } else {
            return callback({
                type: "Bad Request"
            });
        }
    });
}

CategoryService.prototype.update = async function (categoryProps, callback) {
    var condition = {
        categoryId: categoryProps.categoryId,
        isDelete: false
    }
    this.categoryRepository.findOneBy(condition, [], null, function (err, categoryObj) {
        if (err) {
            return callback(err);
        } else if (categoryObj) {
            categoryObj = Object.assign({}, categoryObj, categoryProps);
            
            this.categoryRepository.update(categoryObj, null, function (err, result) {
                if (err) {
                    return callback(err);
                } else if (result) {
                    return callback(null, categoryObj);
                } else {
                    return callback({
                        type: 'Bad Request'
                    });
                }
            })
        } else {
            return callback({
                type: 'Not Found'
            });
        }
    })

}

CategoryService.prototype.delete = async function (categoryProps, callback) {

    var condition = {
        categoryId: categoryProps.categoryId,
        isDelete: false
    }
    
    this.categoryRepository.findOneBy(condition, [], null, function (err, categoryObj) {
        if (err) {
            return callback(err);
        } else if (categoryObj) {
            categoryProps.isDelete = true;
            categoryObj = Object.assign({}, categoryObj, categoryProps);
            
            this.categoryRepository.update(categoryObj, null, function (err, result) {
                if (err) {
                    return callback(err);
                } else if (result) {
                    return callback({type: "Deleted"});
                } else {
                    return callback({
                        type: 'Bad Request'
                    });
                }
            })
        } else {
            return callback({
                type: 'Not Found'
            });
        }
    })

}

module.exports = CategoryService;