module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Customer', {
        customerId: {
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
        firstName: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        gender : {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        dob : {
            type: DataTypes.DATE,
            allowNull: true
        },
        email : {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        telephone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        address : {
            type: DataTypes.TEXT,
            allowNull: true
        }
    })
}