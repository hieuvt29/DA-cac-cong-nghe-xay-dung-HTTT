var nv = require('node-validator');
var rule = require('./validate/user-validator');

var CustomerService = function (customerRepository) {
    this.customerRepository = customerRepository;
}
CustomerService.prototype.getOne = function (condition, select, callback) {
    condition.isDelete = false;
    condition.isActive = true;

    this.customerRepository.findOneBy(condition, select, function (err, result) {
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

CustomerService.prototype.getMany = function (condition, orderBy, select, page, limit, callback) {
    condition.isDelete = false;
    condition.isActive = true;

    this.customerRepository.findAllBy(condition, null, orderBy, select, page, limit, function (err, result) {
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

CustomerService.prototype.create = function (customerProps, callback) {
    var self = this;
    //validate props
    var val = await validate(rule.checkCustomer, customerProps);
    if (val.numErr > 0){
        return callback({type: "Bad Request", error: val.error});
    }

    self.customerRepository.findOneBy({
        'accountId': customerProps.accountId
    }, [], null, function (err, user) {
        if (err) {
            next(err);
        }
        if (!user) {
            self.customerRepository.create(customerProps, null, function (err, newCustomer) {
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, newCustomer);
                }
            })
        } else {
            callback({
                type: "Duplicated"
            });
        }
    })
}

CustomerService.prototype.update = function (customerProps, callback) {
    var self = this;
    //validate props
    var val = await validate(rule.checkCustomer, customerProps);
    if (val.numErr > 0){
        return callback({type: "Bad Request", error: val.error});
    }


    self.customerRepository.findeOneBy({
        customerId: customerProps.customerId
    }, [], null, function (err, customerObj) {
        if (err) {
            callback(err);
        } else if (customerObj) {
            customerObj = Object.assign({},
                customerObj,
                customerProps
            );
            repository.update(customerObj, null, function (err, result) {
                if (err) {
                    callback(err);
                } else if (result) {
                    callback(null, customerObj)
                }
            })
        } else {
            callback({
                type: 'Not Found'
            });
        }
    })
}

CustomerService.prototype.delete = async function (customerProps, callback) {
    var val = await validate(rule.checkCustomer, customerProps);
    if (val.numErr > 0) {
        return callback({
            type: "Bad Request",
            error: val.error
        });
    }

    var condition = {
        customerId: customerProps.customerId,
        isActive: true,
        isDelete: false
    }
    
    this.customerRepository.findOneBy(condition, [], null, function (err, customerObj) {
        if (err) {
            return callback(err);
        } else if (customerObj) {
            customerProps.isDelete = true;
            customerObj = Object.assign({}, customerObj, customerProps);
            
            this.customerRepository.update(customerObj, null, function (err, result) {
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

function validate(rule, obj){
    return new Promise(function(resole){
        nv.run(rule, obj, function(numErr, err){
            if (numErr){
                console.error(err);
                resole({numErr: numErr, error: err});
            }
        });
    })
}
module.exports = CustomerService;