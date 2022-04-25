const { Model ,DataTypes} = require('sequelize');
const {sequelize} = require('./db');
const { Product } = require('./product');

class Product_picture extends Model{}

Product_picture.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    pic_url:{
        type:DataTypes.STRING,
        defaultValue:"product.jpg"//react -> FormData
    },
}, {
    modelName:"product_picture",
    sequelize
})
Product_picture.belongsTo(Product, {onDelete:"CASCADE", onUpdate:"CASCADE"})
Product.hasMany(Product_picture)
Product_picture.sync();
module.exports = {Product_picture}
