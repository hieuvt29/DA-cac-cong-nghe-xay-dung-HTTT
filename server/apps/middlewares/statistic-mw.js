module.exports = {
    getBestSellerProducts: function(req, res) {
        if (res.bestSellerProducts) {
            res.status(200).send({
                status: 200,
                message: 'get best seller products successfully',
                products: res.bestSellerProducts
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    },
    getActiveCustomers: function(req, res) {
        if (res.activeCustomers) {
            res.status(200).send({
                status: 200,
                message: 'get active customers successfully',
                customers: res.activeCustomers
            });
        } else {
            res.status(404).send({message: "Not Found"});
        }
    }
}