module.exports = {
    getOne: function(req, res){
        if (res.admin){
            res.status(200).send({
                status: 200,
                admin: res.admin
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    getMany: function(req, res){
        if (res.admins){
            res.status(200).send({
                status: 200,
                admins: res.admins
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    create: function(req, res){
        if (res.admin){
            res.status(200).send({
                status: 200,
                message: 'created',
                admin: res.admin
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    update: function(req, res){
        if (res.admin){
            res.status(200).send({
                status: 200,
                message: 'updated',
                admin: res.admin
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    delete: function(req, res){
        if (res.admin){
            res.status(200).send({
                status: 200,
                message: 'deleted',
                admin: res.admin
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    }
}