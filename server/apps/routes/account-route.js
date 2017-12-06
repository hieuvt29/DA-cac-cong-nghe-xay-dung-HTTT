var accountMw = require('../middlewares/account-mw');
var roles = require('../../common/role');

module.exports = function (app, accountController, passport) {
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.json({
                errorCode: 1,
                message: "not login",
                data: null
            })
        }
    }

    //ACCOUNT Controllers
    app.route('/login')
        .post(function (req, res, next) {
            passport.authenticate('login', function (err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.json({
                        errorCode: 1,
                        message: info.message,
                        data: null
                    });
                }
                req.logIn(user, function (err) {
                    if (err) throw err;
                    return res.json({
                        errorCode: 0,
                        message: 'Login successfully',
                        user: user
                    });
                });
            })(req, res, next);
        });

    app.route('/logout')
        .get(isLoggedIn, function (req, res) {
            if (req.isAuthenticated()) {
                req.logout();
            }
            res.json({
                errorCode: 0,
                message: "Logout successfully",
                data: null
            });
        });

    app.route('/register')
        .post(accountController.createCustomer, accountMw.create);

    app.route('/user/info')
        .get(isLoggedIn, function (req, res) {
            if (req.isAuthenticated()) {
                res.json({
                    errorCode: 0,
                    message: "user info",
                    user: req.user
                });
            }
        });

    app.route('/user/change-password')
        .post(isLoggedIn, accountController.changePassword,
            accountMw.changePassword);

    app.route('/user/change-username')
        .post(isLoggedIn, accountController.changeUserName,
            accountMw.changeUserName);

    // app.route('/user')
    //     .post(userController.createUser)
    //     .put(userController.updateUser);

    // ADMIN
    function isAdminLoggedIn(req, res, next){
        if (req.isAuthenticated()) {
            if (req.user.role == roles.ADMIN) {
                return next();
            } else {
                return res.json({
                    errorCode: 1,
                    message: "You are not an admin",
                    data: null
                })
            }
        } else {
            return res.json({
                errorCode: 1,
                message: "not login",
            })
        }
    }

    app.get('/admins/:accountId',
        isAdminLoggedIn,
        accountController.getAdmin,
        accountMw.getOne
    );

    app.get('/admins',
        isAdminLoggedIn,
        accountController.getAdmins,
        accountMw.getMany
    );

    app.post('/admins',
        // isAdminLoggedIn,
        accountController.createAdmin,
        accountMw.create
    );

   /*  
   app.put('/admins/:accountId',
        isAdminLoggedIn,
        accountController.update,
        accountMw.update
    );

    app.delete('/admins/:accountId',
        isAdminLoggedIn,
        accountController.delete,
        accountMw.delete
    ) */

    //CUSTOMER
    app.get('/customers/:accountId',
        isAdminLoggedIn,
        accountController.getCustomer,
        accountMw.getOne
    );

    app.get('/customers',
        isAdminLoggedIn,
        accountController.getCustomers,
        accountMw.getMany
    );

    app.delete('/customers/:accountId',
        isAdminLoggedIn,
        accountController.delete,
        accountMw.delete
    )
    /* app.post('/customers',
        isAdminLoggedIn,
        accountController.create,
        accountMw.create
    );

    app.put('/customers/:accountId',
        isAdminLoggedIn,
        accountController.update,
        accountMw.update
    ); */

}