var config = require('./config');
var dbContext = require('./server/repository/data-context')(config.db);
// dbContext.sequelize.sync();
var uuidv4 = require('uuid/v4');
var Sequelize = require('sequelize');
var fs = require('fs');

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

/* Check fulltext search
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
 */

// import data
console.log("start...");
// load data
let data = fs.readFileSync('./crawl-data.json', {
    encoding: 'utf8'
});
data = JSON.parse(data);
dbContext.sequelize.sync().then(function(){
    dbContext.Category.bulkCreate([{
        categoryName: "Sản phẩm mới"
    }, {
        categoryName: "Sản phẩm giảm giá"
    }])
    .then((categories) => {
        console.log("categories created: ", categories);
        console.log("creating account...: ");
        let supplierNames = Object.keys(data);
        let accountsProps = supplierNames.map(supplierName => {
            return {
                userName: supplierName,
                password: supplierName,
                role: 2,
                Supplier: {
                    supplierName: supplierName
                }
            }
        });
        dbContext.Account.bulkCreate(accountsProps, {individualHooks: true})
            .then((accounts) => {
                console.log("accounts created: ", accounts);
                let supplierObjs = [];
                for (let j in accountsProps){
                    supplierObjs.push(Object.assign({}, accountsProps[j].Supplier,{accountId: accounts[j].accountId}));
                };
                dbContext.Supplier.bulkCreate(supplierObjs)
                .then(suppliers => {
                    console.log("supplers: ", suppliers);
                    //feed data
                    console.log("creating products");
                    
                    let allItems = [];
                    for (let i in suppliers) {
                        let supplier = suppliers[i];
                        let items = data[supplier.supplierName];
                        items = items.map((item) => {
                            item.productName = item.name;
                            item.categoryId = categories[0]['categoryId'];
                            item.supplierId = supplier.supplierId;
                            item.image = item.imgLinks[0];
                            let description = {
                                info: item.info,
                                productName: item.name,
                                imgLinks: item.imgLinks
                            }
                            item.description = JSON.stringify(description);
                            delete item.name;
                            delete item.productId;
                            delete item.imgLinks;
                            delete item.info;
                            return item;
                        });
                        allItems = allItems.concat(items);
                    };
                    console.log("allitems: ", allItems);
                    dbContext.Product.bulkCreate(allItems)
                    .then(res => {
                        console.log("products created: ", res);
                        dbContext.Category.findAll().then(categories => {
                            categories.forEach(category => {
                                dbContext.Product.findAll({where: {categoryId: category.categoryId}})
                                .then(relvProducts => {
                                    category.setProducts(relvProducts);
                                    console.log("done");
                                }).catch(err => console.log("err: ", err));
                            })
                        }).catch(err => console.log("err: ", err));
                        
                    }).catch(err => console.log("err: ", err));
                }).catch(err => console.log("err: ", err));
                
            }).catch((err) => console.log("error: ", err));
    }).catch(err => console.log("error: ", err));
})
