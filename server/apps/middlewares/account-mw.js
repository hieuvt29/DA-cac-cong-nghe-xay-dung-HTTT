module.exports = {
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
    }
}