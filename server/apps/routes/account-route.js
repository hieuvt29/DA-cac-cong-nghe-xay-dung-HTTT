var accountMw = require('../middlewares/account-mw');

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
    //account Controllers
    app.route('/login')
        .post(function (req, res, next) {
            passport.authenticate('login', function (err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.json({
                        errorCode: 1,
                        message: 'Login Failed',
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
        .post(accountController.create, accountMw.create);

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

}