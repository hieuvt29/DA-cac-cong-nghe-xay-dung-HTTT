module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Admin', {
        adminId: {
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
        email: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        telephone: {
            type: DataTypes.STRING(50), 
            allowNull: true
        }
    })
}