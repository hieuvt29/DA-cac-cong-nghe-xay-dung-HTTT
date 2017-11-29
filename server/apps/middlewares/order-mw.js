module.exports = {
    getOne: function(req, res){
        if (res.order){
            res.status(200).send({
                status: 200,
                order: res.order
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    getMany: function(req, res){
        if (res.orders){
            res.status(200).send({
                status: 200,
                orders: res.orders
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    create: function(req, res){
        if (res.order){
            res.status(200).send({
                status: 200,
                message: 'created',
                order: res.order
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    update: function(req, res){
        if (res.order){
            res.status(200).send({
                status: 200,
                message: 'updated',
                order: res.order
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    delete: function(req, res){
        if (res.order){
            res.status(200).send({
                status: 200,
                message: 'deleted',
                order: res.order
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    }
}