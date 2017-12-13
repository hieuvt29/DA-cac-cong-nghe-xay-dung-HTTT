var orderMw = require('../middlewares/order-mw');

module.exports = function(app, orderController){
    app.get('/orders/:orderId', 
        orderController.getOne,
        orderMw.getOne
    );

    app.get('/orders',
        orderController.getMany,
        orderMw.getMany
    );

    app.post('/orders', 
        orderController.create,
        orderMw.create
    );
    
    app.put('/orders/:orderId',
        orderController.updateState, 
        orderMw.update
    );

/*     app.delete('/orders/:orderId',
        orderController.delete,
        orderMw.delete
    ) */
}