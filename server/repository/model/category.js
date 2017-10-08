module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Category', {
        categoryId: {
            type: DataTypes.UUID,
            allowNull: false, 
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        categoryName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT, 
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },        
        isDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
}