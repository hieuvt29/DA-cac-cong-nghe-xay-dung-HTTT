var statisticMw = require('../middlewares/statistic-mw');

module.exports = function(app, statisticController) {
    app.get('/best-seller-products', 
        statisticController.getBestSellerProducts,
        statisticMw.getBestSellerProducts
    )

    app.get('/active-customers', 
        statisticController.getActiveCustomers,
        statisticMw.getActiveCustomers
    )
}