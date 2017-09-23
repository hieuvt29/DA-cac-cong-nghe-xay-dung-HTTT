module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Product', {
        productId: {
            type: DataTypes.UUID,
            allowNull: false, 
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        productName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        categoryId : {
            type: DataTypes.UUID,
            allowNull: false
        },
        supplierId : {
            type: DataTypes.UUID,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE, 
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false, 
            defaultValue: '/img/default.png'
        },
        description: {
            type: DataTypes.TEXT, 
            allowNull: true
        },
        views: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        createAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },        
        isDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        }
    })
}