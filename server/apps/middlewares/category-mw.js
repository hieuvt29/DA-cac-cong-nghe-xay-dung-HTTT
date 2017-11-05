module.exports = {
    getOne: function(req, res){
        if (res.category){
            res.status(200).send({
                status: 200,
                category: res.category
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    getMany: function(req, res){
        if (res.categories){
            res.status(200).send({
                status: 200,
                categories: res.categories
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    create: function(req, res){
        if (res.category){
            res.status(200).send({
                status: 200,
                message: 'created',
                category: res.category
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    update: function(req, res){
        if (res.category){
            res.status(200).send({
                status: 200,
                message: 'updated',
                category: res.category
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    delete: function(req, res){
        if (res.category){
            res.status(200).send({
                status: 200,
                message: 'deleted',
                category: res.category
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    }
}