module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Account', {
        accountId: {
            type: DataTypes.UUID,
            allowNull: false, 
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        userName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        createAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        role : {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
        isDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        }
    })
}