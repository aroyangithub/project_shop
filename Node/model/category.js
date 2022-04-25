const { Model ,DataTypes} = require('sequelize');
const {sequelize} = require('./db');

class Category extends Model{}

Category.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:true
    },
    pic_url:{
        type:DataTypes.STRING,
        defaultValue:"1.jpg"
    }
}, {
    modelName:"category",
    sequelize
})
Category.sync();
module.exports = {Category}
