var dependencies = {
} // solve problem "this" keyword does not reference to this class

var ProductController = function (categoryService) {
    dependencies.categoryService = categoryService;

}

ProductController.prototype.getOne = function (req, res, next) {
    var categoryId = req.params.categoryId;

    dependencies.categoryService.getOne({ 'categoryId': categoryId }, [], function (err, category) {
        if (err) {
            next(err);
        } else {
            res.category = category;
            next();
        }
    })
}

ProductController.prototype.getMany = function (req, res, next) {
    var condition = req.where;
    var orderBy = req.options.sort;
    var select = req.fields ? req.fields : [];
    var page = req.options.skip;
    var limit = req.options.limit;

    dependencies.categoryService.getMany(condition, orderBy, select, page, limit, function (err, categories) {
        if (err) {
            next(err);
        } else {
            res.categories = categories;
            next();
        }
    })
}


ProductController.prototype.create = function (req, res, next) {
    var categoryProps = req.body;

    dependencies.categoryService.create(categoryProps, function (err, category) {
        if (err) {
            next(err);
        } else {
            res.category = category;
            next();
        }
    })
}

ProductController.prototype.update = function (req, res, next) {
    var categoryId = req.params.categoryId;
    var categoryProps = req.body;
    categoryProps.categoryId = categoryId;

    dependencies.categoryService.update(categoryProps, function (err, category) {
        if (err) {
            next(err);
        } else {
            res.category = category;
            next();
        }
    })
}

ProductController.prototype.delete = function (req, res, next) {
    var categoryId = req.params.categoryId;

    dependencies.categoryService.delete({ 'categoryId': categoryId }, function (err, result) {
        if (err) {
            next(err);
        } else {
            res.result = result;
            next();
        }
    })
}

module.exports = ProductController;