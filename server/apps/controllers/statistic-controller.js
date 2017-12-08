var dependencies = {}

var StatisticController = function(orderRepository) {
    dependencies.orderRepository = orderRepository;
}

StatisticController.prototype.getBestSellerProducts = function(req, res, next) {
    var sequelize = dependencies.orderRepository.dbContext.sequelize;

    var query = "SELECT P.productName, P.price, OPAG.numProducts FROM (SELECT OP.productId, SUM(OP.orderQuantity) as numProducts FROM `Orders-Products` as OP GROUP BY OP.productId ORDER BY numProducts DESC) AS OPAG JOIN (Products as P) ON OPAG.productId=P.productId;";
    var options = {
        type: sequelize.QueryTypes.SELECT
    }
    sequelize
    .query(query, options)
    .then(function(result){
        res.bestSellerProducts = result;
        next();
    }).catch(function(err) {
        return next(err);
    })
}

StatisticController.prototype.getActiveCustomers = function(req, res, next) {
    var Order = dependencies.orderRepository.Order;
    var sequelize = dependencies.orderRepository.dbContext.sequelize;
    var dbContext = dependencies.orderRepository.dbContext;

    Order.findAll({
        where: {
            "accountId": {
                $ne: null
            }
        },
        group: 'accountId',
        attributes: ['accountId', [sequelize.fn('COUNT', sequelize.col('orderId')), 'numOrders']],
        include: [{
            model: dbContext.Account
        }]
    }).then(function(result) {
        res.activeCustomers = result;
        next();
    }).catch(function(err) {
        next(err);
    })
}

module.exports = StatisticController;