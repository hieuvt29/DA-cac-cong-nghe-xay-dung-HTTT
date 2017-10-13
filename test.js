var config = require('./config');
var dbContext = require('./server/repository/data-context')(config.db);
// dbContext.sequelize.sync();
var uuidv4 = require('uuid/v4');
// Repositories
var ProductRepository = require('./server/repository/product-repository');
var productRepository = new ProductRepository(dbContext);

var AccountRepository = require('./server/repository/account-repository');
var accountRepository = new AccountRepository(dbContext);

var CustomerRepository = require('./server/repository/customer-repository');
var customerRepository = new CustomerRepository(dbContext);

var SupplierRepository = require('./server/repository/supplier-repository');
var supplierRepository = new SupplierRepository(dbContext);

var accountObj = {
    userName: "vutronghieu",
    password: "123321",
    role: 1,
    Supplier: {
        supplierName: "vutronghieu"
    }
}

var supplierObj = {
    supplierName: "vutronghieu",
    Account: {
        userName: "vutronghieu",
        password: "123321",
        role: 1
    }
}

supplierRepository.save(accountObj, [dbContext.Account.Supplier], function(err, result){
    if (err) {
        console.log(err);
    } else {
        console.log(result);
        console.log("done");
    }
}) 