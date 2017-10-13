module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Supplier', {
        supplierId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        accountId: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true
        },
        supplierName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        type : {
            type: DataTypes.STRING(50), 
            allowNull: true
        },
        contact : {
            type: DataTypes.STRING(40),
            allowNull: true
        },
        isDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
}