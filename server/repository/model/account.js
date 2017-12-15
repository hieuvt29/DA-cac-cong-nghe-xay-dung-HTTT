module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Account', {
        accountId: {
            type: DataTypes.UUID,
            allowNull: false, 
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        userName: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        role : {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
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
            type: DataTypes.DATEONLY,
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
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        isDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
}