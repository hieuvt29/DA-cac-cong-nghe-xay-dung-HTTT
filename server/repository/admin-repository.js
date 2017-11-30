var AdminRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.Admin = dbContext.Admin;
}

AdminRepository.prototype.findOneBy = function(condition, select, association, callback) {
    this.Admin
        .findOne({
            attributes: select.length ? select : null,
            where: condition ? condition: null,
            include: association
        })
        .then(function(result) {
            if (result){
                callback(null, result.dataValues);
            } else {
                callback(null, null);
            }
            
        })
        .catch(function(err) {
            callback(err, null);
        });
}

AdminRepository.prototype.findAllBy = function (condition, association, orderBy, select, page, limit, callback) {
    this.Admin
        .findAll({
            attributes: select.length ? select : null,
            where: condition ? condition : null,
            order: orderBy ? orderBy : null,
            limit: limit,
            offset: page * limit,
            include: association
        })
        .then(function (result) {
            if (result){
                let res = result.map(function(val){
                    return val.dataValues
                })
                callback(null, res);
            } else {
                callback(null, null);
            }

        })
        .catch(function (err) {
            callback(err, null);
        });
}

AdminRepository.prototype.save = function(adminObj, association, callback) {
    this.Admin
    .create(adminObj, {
        include: association
    })
    .then(function(result){
        if (result){   
            callback(null, result);
        } else {
            callback(null, null);
        }
    
    })
    .catch(function(err){
        callback(err, null);
    })
}

AdminRepository.prototype.update = function(adminObj, association, callback) {
    this.Admin
    .update(adminObj, {
        where: { adminId : adminObj.adminId},
        include: association
    })
    .then(function(result){
        if(result.every(function(val){
            return val == 1;
        })){
            callback(null, true);
        }else{
            callback(null, false);
        }
    })
    .catch(function(err){
        callback(err, null);
    })
}

module.exports = AdminRepository;