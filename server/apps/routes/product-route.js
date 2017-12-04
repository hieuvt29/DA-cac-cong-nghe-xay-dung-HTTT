var productMw = require('../middlewares/product-mw');

module.exports = function(app, productController){
    function isLoggedIn(req, res, next) {
        // if (req.isAuthenticated()) {
        //     return next();
        // } else {
        //     return res.json({
        //         errorCode: 1,
        //         message: "not login",
        //         data: null
        //     })
        // }
        next();
    }

    app.get('/products/:productId', 
        productController.getOne,
        productMw.getOne
    );

    app.get('/products',
        productController.getMany,
        productMw.getMany
    );

    app.post('/products', 
        isLoggedIn,
        productController.create,
        productMw.create
    );
    
    app.put('/products/:productId',
        isLoggedIn,
        productController.update, 
        productMw.update
    );

    app.delete('/products/:productId',
        isLoggedIn,
        productController.delete,
        productMw.delete
    )
}