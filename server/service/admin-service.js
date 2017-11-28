var nv = require('node-validator');
var rule = require('./validate/user-validator');

var AdminService = function (adminRepository) {
    this.adminRepository = adminRepository;
}

AdminService.prototype.getOne = function (condition, select, callback) {

    this.adminRepository.findOneBy(condition, select, function (err, result) {
        if (err) {
            return callback(err);
        } else if (result) {
            return callback(null, result);
        } else {
            return callback({
                type: "Not Found"
            });
        }
    })
}

AdminService.prototype.getMany = function (condition, orderBy, select, page, limit, callback) {

    this.adminRepository.findAllBy(condition, null, orderBy, select, page, limit, function (err, result) {
        if (err) {
            return callback(err);
        } else if (result) {
            return callback(null, result);
        } else {
            return callback({
                type: "Not Found"
            });
        }
    })
}

AdminService.prototype.create = async function (adminProps, callback) {
    var self = this;
    //validate props
    var val = await validate(rule.checkAdmin, adminProps);
    if (val.numErr > 0){
        return callback({type: "Bad Request", error: val.error});
    }

    self.adminRepository.findOneBy({
        'accountId': adminProps.accountId
    }, [], null, function (err, user) {
        if (err) {
            return callback(err);
        }
        if (!user) {
            self.adminRepository.save(adminProps, null, function (err, newAdmin) {
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, newAdmin);
                }
            })
        } else {
            callback({
                type: "Duplicated"
            });
        }
    })
}

AdminService.prototype.update = async function (adminProps, callback) {
    var self = this;
    //validate props
    var val = await validate(rule.checkAdmin, adminProps);
    if (val.numErr > 0){
        return callback({type: "Bad Request", error: val.error});
    }

    self.adminRepository.findOneBy({
        adminId: adminProps.adminId
    }, [], null, function (err, adminObj) {
        if (err) {
            callback(err);
        } else if (adminObj) {
            adminObj = Object.assign({},
                adminObj,
                adminProps
            );
            self.adminRepository.update(adminObj, null, function (err, result) {
                if (err) {
                    callback(err);
                } else if (result) {
                    callback(null, adminObj)
                }
            })
        } else {
            callback({
                type: 'Not Found'
            });
        }
    })
}

AdminService.prototype.delete = async function (adminProps, callback) {
    var val = await validate(rule.checkAdmin, adminProps);
    if (val.numErr > 0) {
        return callback({
            type: "Bad Request",
            error: val.error
        });
    }

    var condition = {
        adminId: adminProps.adminId,
        isDelete: false
    }
    
    this.adminRepository.findOneBy(condition, [], null, function (err, adminObj) {
        if (err) {
            return callback(err);
        } else if (adminObj) {
            adminProps.isDelete = true;
            adminObj = Object.assign({}, adminObj, adminProps);
            
            this.adminRepository.update(adminObj, null, function (err, result) {
                if (err) {
                    return callback(err);
                } else if (result) {
                    return callback({type: "Deleted"});
                } else {
                    return callback({
                        type: 'Bad Request'
                    });
                }
            })
        } else {
            return callback({
                type: 'Not Found'
            });
        }
    })

}


function validate(rule, obj) {
    return new Promise(function (resolve, reject) {
        nv.run(rule, obj, function (numErr, err) {
            if (numErr) {
                console.error(err);
                return resolve({
                    numErr: numErr,
                    error: err
                });
            } else {
                return resolve({
                    numErr: 0
                })
            }
        });
    })
}
module.exports = AdminService;