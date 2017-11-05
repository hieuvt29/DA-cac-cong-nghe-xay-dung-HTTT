module.exports = {
    getOne: function(req, res){
        if (res.customer){
            res.status(200).send({
                status: 200,
                customer: res.customer
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    getMany: function(req, res){
        if (res.customers){
            res.status(200).send({
                status: 200,
                customers: res.customers
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    create: function(req, res){
        if (res.customer){
            res.status(200).send({
                status: 200,
                message: 'created',
                customer: res.customer
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    update: function(req, res){
        if (res.customer){
            res.status(200).send({
                status: 200,
                message: 'updated',
                customer: res.customer
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    delete: function(req, res){
        if (res.customer){
            res.status(200).send({
                status: 200,
                message: 'deleted',
                customer: res.customer
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    }
}