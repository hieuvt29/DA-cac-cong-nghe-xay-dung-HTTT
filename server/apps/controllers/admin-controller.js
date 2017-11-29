var dependencies = {
} // solve problem "this" keyword does not reference to this class

var AdminController = function (adminService) {
    dependencies.adminService = adminService;

}

AdminController.prototype.getOne = function (req, res, next) {
    var adminId = req.params.adminId;

    dependencies.adminService.getOne({ 'adminId': adminId }, [], function (err, admin) {
        if (err) {
            next(err);
        } else {
            res.admin = admin;
            next();
        }
    })
}

AdminController.prototype.getMany = function (req, res, next) {
    var condition = req.where;
    var orderBy = req.options.sort;
    var select = req.fields ? req.fields : [];
    var page = req.options.skip;
    var limit = req.options.limit;

    dependencies.adminService.getMany(condition, orderBy, select, page, limit, function (err, admins) {
        if (err) {
            next(err);
        } else {
            res.admins = admins;
            next();
        }
    })
}

AdminController.prototype.create = function (req, res, next) {
    var adminProps = req.body;

    dependencies.adminService.create(adminProps, function (err, admin) {
        if (err) {
            next(err);
        } else {
            res.admin = admin;
            next();
        }
    })
}

AdminController.prototype.update = function (req, res, next) {
    var adminId = req.params.adminId;
    var adminProps = req.body;
    adminProps.adminId = adminId;

    dependencies.adminService.update(adminProps, function (err, admin) {
        if (err) {
            next(err);
        } else {
            res.admin = admin;
            next();
        }
    })
}

AdminController.prototype.delete = function (req, res, next) {
    var adminId = req.params.adminId;

    dependencies.adminService.delete({ 'adminId': adminId }, function (err, result) {
        if (err) {
            next(err);
        } else {
            res.result = result;
            next();
        }
    })
}

module.exports = AdminController;