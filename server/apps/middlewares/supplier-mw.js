module.exports = {
    getOne: function(req, res){
        if (res.supplier){
            res.status(200).send({
                status: 200,
                supplier: res.supplier
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    getMany: function(req, res){
        if (res.suppliers){
            res.status(200).send({
                status: 200,
                suppliers: res.suppliers
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    create: function(req, res){
        if (res.supplier){
            res.status(200).send({
                status: 200,
                message: 'created',
                supplier: res.supplier
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    update: function(req, res){
        if (res.supplier){
            res.status(200).send({
                status: 200,
                message: 'updated',
                supplier: res.supplier
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    delete: function(req, res){
        if (res.supplier){
            res.status(200).send({
                status: 200,
                message: 'deleted',
                supplier: res.supplier
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    }
}