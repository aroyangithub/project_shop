const { text } = require('body-parser');
const { Model ,DataTypes} = require('sequelize');
const {sequelize} = require('./db');
const { Product } = require('./product');
const { User } = require('./user');

class Feedback extends Model{}

Feedback .init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    text:{
        type:DataTypes.STRING,
        primaryKey:true

    },
    rating:{
        type:DataTypes.INTEGER,
        primaryKey:true
    }
 
}, {
    modelName:"feedback",
    sequelize
})
Feedback .belongsTo(User, {onDelete:"CASCADE", onUpdate:"CASCADE"})
Feedback .belongsTo(Product, {onDelete:"CASCADE", onUpdate:"CASCADE"})
User.hasMany(Feedback)
Product.hasMany(Feedback)
Feedback.sync();
module.exports = {Feedback}
