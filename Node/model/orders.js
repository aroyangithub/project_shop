const { Model ,DataTypes} = require('sequelize');
const {sequelize} = require('./db');
const { Product } = require('./product');
const { User } = require('./user');

class Order extends Model{}

Order.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
  name:{
      type:DataTypes.STRING,
      primaryKey:true
  },
  total:{
      type:DataTypes.DOUBLE,
      primaryKey:true
  }
}, {
    modelName:"order",
    sequelize
})
Order.belongsTo(Product)
Order.belongsTo(User, {onDelete:"CASCADE", onUpdate:"CASCADE"})
Product.hasMany(Order)
User.hasMany(Order)
Order.sync();
module.exports = {Order}
