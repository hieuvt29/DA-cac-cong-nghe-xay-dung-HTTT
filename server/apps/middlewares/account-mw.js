module.exports = {
    getOne: function(req, res){
        if (res.account){
            res.status(200).send({
                status: 200,
                account: res.account
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    getMany: function(req, res){
        if (res.accounts){
            res.status(200).send({
                status: 200,
                accounts: res.accounts
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    create: function(req, res){
        if (res.account){
            res.status(200).send({
                status: 200,
                message: 'created',
                account: res.account
            });
        } else if (res.error) {
            res.status(400).send(res.error);
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    changePassword: function(req, res){
        if (res.account){
            res.status(200).send({
                status: 200,
                message: 'password changed',
                account: res.account
            });
        } else if (res.error) {
            res.status(400).send(res.error);
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    changeUserName: function(req, res){
        if (res.account){
            res.status(200).send({
                status: 200,
                message: 'username changed',
                account: res.account
            });
        }  else if (res.error) {
            res.status(400).send(res.error);
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    delete: function(req, res){
        if (res.account){
            res.status(200).send({
                status: 200,
                message: 'deleted',
                account: res.account
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    }
}