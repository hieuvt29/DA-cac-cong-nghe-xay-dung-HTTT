var productMw = require('../middlewares/product-mw');

module.exports = function(app, productController){
    app.get('/products/:productId', 
        productController.getOne,
        productMw.getOne
    );

    app.get('/products',
        productController.getMany,
        productMw.getMany
    );

    app.post('/products', 
        productController.create,
        productMw.create
    );
    
    app.put('/products/:productId',
        productController.update, 
        productMw.update
    );

    app.delete('/products/:productId',
        productController.delete,
        productMw.delete
    )
}