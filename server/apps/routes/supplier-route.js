var supplierMw = require('../middlewares/supplier-mw');

module.exports = function(app, supplierController){
    app.get('/suppliers/:supplierId', 
        supplierController.getOne,
        supplierMw.getOne
    );

    app.get('/suppliers',
        supplierController.getMany,
        supplierMw.getMany
    );

    app.post('/suppliers', 
        supplierController.create,
        supplierMw.create
    );
    
    app.put('/suppliers/:supplierId',
        supplierController.update, 
        supplierMw.update
    );

    app.delete('/suppliers/:supplierId',
        supplierController.delete,
        supplierMw.delete
    )
}