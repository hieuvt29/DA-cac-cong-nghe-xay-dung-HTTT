module.exports = {
    getOne: function(req, res){
        if (res.product){
            res.status(200).send({
                status: 200,
                product: res.product
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    getMany: function(req, res){
        if (res.products){
            res.status(200).send({
                status: 200,
                products: res.products
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    create: function(req, res){
        if (res.product){
            res.status(200).send({
                status: 200,
                message: 'created',
                product: res.product
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    update: function(req, res){
        if (res.product){
            res.status(200).send({
                status: 200,
                message: 'updated',
                product: res.product
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    delete: function(req, res){
        if (res.product){
            res.status(200).send({
                status: 200,
                message: 'deleted',
                product: res.product
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    }
}