var adminMw = require('../middlewares/admin-mw');

module.exports = function(app, adminController){
    app.get('/admins/:adminId', 
        adminController.getOne,
        adminMw.getOne
    );

    app.get('/admins',
        adminController.getMany,
        adminMw.getMany
    );

    app.post('/admins', 
        adminController.create,
        adminMw.create
    );
    
    app.put('/admins/:adminId',
        adminController.update, 
        adminMw.update
    );

    app.delete('/admins/:adminId',
        adminController.delete,
        adminMw.delete
    )
}