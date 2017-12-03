var Sequelize = require('sequelize');

var DataContext = function(config) {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);

    var Category = sequelize.import('./model/category');
    var Customer = sequelize.import('./model/customer');
    var Product = sequelize.import('./model/product');
    var Supplier = sequelize.import('./model/supplier');
    var Account = sequelize.import('./model/account');
    var Admin = sequelize.import('./model/admin');
    var Order = sequelize.import('./model/order');
    var OrderProduct = sequelize.import('./model/order-product');

    Account.Customer = Account.hasOne(Customer, {foreignKey: 'accountId'});
    Account.Admin = Account.hasOne(Admin, {foreignKey: 'accountId'});
    
    Product.Supplier = Product.belongsTo(Supplier, {foreignKey: 'supplierId'});

    Category.Products = Category.belongsToMany(Product, {through: 'Categories-Products', foreignKey: 'categoryId'});
    Product.Categories = Product.belongsToMany(Category, {through: 'Categories-Products', foreignKey: 'productId'});
    
    Order.Products = Order.belongsToMany(Product, {through: 'Orders-Products', foreignKey: 'orderId'});
    Product.Orders = Product.belongsToMany(Order, {through: 'Orders-Products', foreignKey: 'productId'});

    Category.Parent = Category.hasMany(Category, {foreignKey: 'parentId'});
    
    return {
        Account: Account,
        Category: Category,
        Admin: Admin,
        Customer: Customer,
        Product: Product, 
        Supplier: Supplier,
        Order: Order,
        sequelize: sequelize
    }
}

module.exports = DataContext;