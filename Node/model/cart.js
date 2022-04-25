const { Model ,DataTypes} = require('sequelize');
const {sequelize} = require('./db');
const { Product } = require('./product');
const { User } = require('./user');

class Cart extends Model{}

Cart .init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    quantity:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        defaultValue:1      
    } 
}, {
    modelName:"cart",
    sequelize
})
Cart.belongsTo(User, {onDelete:"CASCADE", onUpdate:"CASCADE"})
Cart.belongsTo(Product, {onDelete:"CASCADE", onUpdate:"CASCADE"})
User.hasMany(Cart)
Product.hasMany(Cart)
Cart.sync();
module.exports = {Cart}
