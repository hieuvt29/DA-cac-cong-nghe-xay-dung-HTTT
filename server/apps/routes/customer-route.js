var customerMw = require('../middlewares/customer-mw');

module.exports = function(app, customerController){
    app.get('/customers/:customerId', 
        customerController.getOne,
        customerMw.getOne
    );

    app.get('/customers',
        customerController.getMany,
        customerMw.getMany
    );

    app.post('/customers', 
        customerController.create,
        customerMw.create
    );
    
    app.put('/customers/:customerId',
        customerController.update, 
        customerMw.update
    );

    app.delete('/customers/:customerId',
        customerController.delete,
        customerMw.delete
    )
}