module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Orders-Products', {
        orderId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        productId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        orderQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            defaultValue: 1
        }
    })
}