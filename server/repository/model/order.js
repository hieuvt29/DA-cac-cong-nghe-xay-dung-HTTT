var orderStates = require('../../common/order-states');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Order', {
        orderId: {
            type: DataTypes.UUID,
            allowNull: false, 
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        accountId: {
            type: DataTypes.UUID,
            allowNull: null
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        address : {
            type: DataTypes.TEXT,
            allowNull: true
        },
        deliveryDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        telephone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        total: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: orderStates.PENDING
        }
    })
}