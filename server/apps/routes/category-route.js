var categoryMw = require('../middlewares/category-mw');

module.exports = function(app, categoryController){
    app.get('/categories/:categoryId', 
        categoryController.getOne,
        categoryMw.getOne
    );

    app.get('/categories',
        categoryController.getMany,
        categoryMw.getMany
    );

    app.post('/categories', 
        categoryController.create,
        categoryMw.create
    );
    
    app.put('/categories/:categoryId',
        categoryController.update, 
        categoryMw.update
    );

    app.delete('/categories/:categoryId',
        categoryController.delete,
        categoryMw.delete
    )
}