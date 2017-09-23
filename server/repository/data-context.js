var Sequelize = require('sequelize');

var DataContext = function(config) {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);

    var Category = sequelize.import('./model/category');
    var Customer = sequelize.import('./model/customer');
    var Product = sequelize.import('./model/product');
    var Supplier = sequelize.import('./model/supplier');
    var Account = sequelize.import('./model/account');
    
    return {
        Account: Account,
        Category: Category,
        Customer: Customer,
        Product: Product, 
        Supplier: Supplier,
        sequelize: sequelize
    }
}

module.exports = DataContext;