var accountMw = require('../middlewares/account-mw');

module.exports = function (app, accountController) {
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
    //user Controllers
    app.route('/login')
        .post(function (req, res, next) {
            passport.authenticate('login', function (err, user, info) {
                if (err) return console.error(err);
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
                        data: user
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
        .post(accountController.createUser);

    app.route('/user/info')
        .get(isLoggedIn, function (req, res) {
            if (req.isAuthenticated()) {
                res.json({
                    errorCode: 0,
                    message: "user info",
                    data: req.user
                });
            }
        });

    app.route('/user/change-password')
        .post(isLoggedIn, accountController.changePassword);


    app.route('/user')
        .post(userController.createUser)
        .put(userController.updateUser);

}