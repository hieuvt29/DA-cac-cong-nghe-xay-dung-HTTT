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
/* 
// Check fulltext search
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
var keywords = "-";
var fields = ['a', 'b'];
var condition = {
    a: 10
};

var callback = (err, result) => {
    if (err) {
        console.log("Something fail: ", err);
    } else {
        let res = result.map(val => val.dataValues);
        console.log("res: ", res);
    }
}
sequelize.query(
    'SELECT ' + (fields.length ? fields.join(',') : '*') + ' FROM tests WHERE MATCH (b) AGAINST (:keywords)', {
        where: condition,
        replacements: {
            keywords: keywords
        },
        model: Tests,
        type: sequelize.QueryTypes.SELECT
    }
).then(function (result) {
    callback(null, result);
}).catch(function (err) {
    callback(err);
})
 */

/* // IMPORT DATA
console.log("start...");
// load data
let data = fs.readFileSync('./crawl-data.json', {
    encoding: 'utf8'
});
data = JSON.parse(data);
dbContext.sequelize.sync().then(function () {
    // create categories
    dbContext.Category.bulkCreate([{
        categoryName: "Sản phẩm mới"
    }, {
        categoryName: "Sản phẩm giảm giá"
    }])
    .then((categories) => {
        console.log("------ categories created ------ ");
        console.log("creating admin...: ");
        
        let accountsProps = {
            userName: "hieuvt",
            password: '123321',
            role: 0,
            firstName: "vu",
            lastName: "hieu",
            gender: "male",
            email: "hieuvt@gmail.com"
        }
        // create account along with admin
        dbContext.Account.create(accountsProps)
            .then((account) => {
                console.log("account created: ", account);
                console.log("creating suppliers...");
                let supplierNames = Object.keys(data);
                let supplierObjs = supplierNames.map(supplierName => ({supplierName: supplierName}));
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
                                // item.categoryId = categories[0]['categoryId'];
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
                            .then(products => {
                                console.log("products created: ", products);
                                categories[0].setProducts(products).then(function(result){
                                    console.log("RESULT: ", result);
                                    console.log("DONE");
                                }).catch(err => console.log("err: ", err));
                            }).catch(err => console.log("err: ", err));
                    }).catch((err) => console.log("error: ", err));
                    
            }).catch(err => console.log("error: ", err));
    })
})
 */


// CHECK SET/ADD/GET SEQUELIZE INSTANCES
/*
- setObject() will delete row that not satisfy both ids and add new rows in many2many-table that satisfied both two object ids;
- addObject() will add a row in many2many-table with value correspond with object ids;
- object.dataValues also contains association Object
*/
var db = config.db;
var sequelize = new Sequelize(db.database, db.username, db.password, db);
var test_user = sequelize.define('test_user', {
    username: Sequelize.STRING
});

var test_task = sequelize.define('test_task', {
    taskname: Sequelize.STRING
});

test_user.tasks = test_user.belongsToMany(test_task, {through: "user_tasks", foreignKey: 'ownerId'});
test_task.owners = test_task.belongsToMany(test_user, {through: "user_tasks", foreignKey: 'taskId'});

sequelize.sync().then(function() {
    test_user.findOne({where: {id: 5}})
    .then(user => {
        test_task.findAll({where: {id: [1, 3]}}).then(task => {
            user.setTest_tasks(task).then(tu => {
                console.log("UserTask: ", tu);
            })
        })
    })
    .catch(err => {
        console.log("ERR: ", err);
    })
})
