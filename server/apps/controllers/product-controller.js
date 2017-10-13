var dependencies = { 
} // solve problem "this" keyword does not reference to this class

var ProductController = function(productService){
    dependencies.productService = productService;

}

ProductController.prototype.getOne = function(req, res, next){
    var productId = req.params.productId;

    dependencies.productService.getOne({'productId': productId}, [], function(err, product){
        if (err) {
            next(err);
        } else {
            res.product = product;
            next();
        }
    })
}

ProductController.prototype.getMany = function(req, res, next){
    var condition = req.where;
    var orderBy = req.options.sort;
    var select = req.fields ? req.fields: [];
    var page = req.options.skip;
    var limit = req.options.limit;

    dependencies.productService.getMany(condition, orderBy, select, page, limit, function(err, products){
        if (err) {
            next(err);
        } else {
            res.products = products;
            next();
        }
    })
}

    
ProductController.prototype.create = function(req, res, next){
    var productProps = req.body;
    
    dependencies.productService.create(productProps, function(err, product){
        if (err) {
            next(err);
        } else {
            res.product = product;
            next();
        }
    })
}

ProductController.prototype.update = function(req, res, next){
    var productId = req.params.productId;
    var productProps = req.body;
    productProps.productId = productId;

    dependencies.productService.update(productProps, function(err, product){
        if (err) {
            next(err);
        } else {
            res.product = product;
            next();
        }
    })
}

ProductController.prototype.delete = function(req, res, next){
    var productId = req.params.productId;
    
    dependencies.productService.delete({'productId': productId}, function(err, result){
        if (err) {
            next(err);
        } else {
            res.result = result;
            next();
        }
    })
}

module.exports = ProductController;