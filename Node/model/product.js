const { Model, DataTypes } = require('sequelize');
const { Category } = require('./category');
const { sequelize } = require('./db');
const { User } = require('./user');

class Product extends Model { }

Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    isUsed: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    modelName: "product",
    sequelize
})
Product.belongsTo(User, { onDelete: "CASCADE", onUpdate: "CASCADE" })
Product.belongsTo(Category, { onDelete: "CASCADE", onUpdate: "CASCADE" })
User.hasMany(Product)
Category.hasMany(Product)

Product.sync();

module.exports = { Product }
