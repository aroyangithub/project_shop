const { Model ,DataTypes} = require('sequelize');
const {sequelize} = require('./db');
const { Product } = require('./product');
const { User } = require('./user');

class Wishlist extends Model{}

Wishlist .init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    }
 
}, {
    modelName:"wishlist",
    sequelize
})

Wishlist .belongsTo(User, {onDelete:"CASCADE", onUpdate:"CASCADE"})
Wishlist .belongsTo(Product, {onDelete:"CASCADE", onUpdate:"CASCADE"})
User.hasMany(Wishlist )
Product.hasMany(Wishlist )
Wishlist.sync();

module.exports = {Wishlist}
