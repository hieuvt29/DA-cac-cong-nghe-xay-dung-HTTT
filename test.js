var config = require('./config');
var dbContext = require('./server/repository/data-context')(config.db);
// dbContext.sequelize.sync();
var uuidv4 = require('uuid/v4');
var Sequelize = require('sequelize');

/* Check Sequelize Association
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
})  */

/* Check async/await feature 
function getInfo() {
    return new Promise(resolve => {
      setTimeout(() => {
          console.error("async done");
        resolve(10);
      }, 2000);
    });
  }
  
  
  async function add1(x) {
    var a = await getInfo();
    console.log(a);
    console.log("askjfl;aksjdf");
  }

  add1(2);
 */
var db = config.db;
var sequelize = new Sequelize(db.database, db.username, db.password, db);
var Tests = sequelize.define('test', {
    a: {
        type: Sequelize.INTEGER
    },
    b: {
        type: Sequelize.TEXT
    }
}, {
    indexes: [{
        type: 'FULLTEXT',
        fields: ['b']
    }]
});

/*  */
// sequelize.sync();
var keywords = "sử dụng"
var fields = ['b']
var callback = (err, result) => {console.error(err); console.log(result)}
sequelize.query(
    'SELECT ' + (fields.length?fields.join(','):'*') +' FROM tests WHERE MATCH (b) AGAINST (:keywords)',{ replacements: {keywords: keywords}, model: Tests, type: sequelize.QueryTypes.SELECT}
).then(function(result){
    callback(null, result);
}).catch(function(err){
    callback(err);
})