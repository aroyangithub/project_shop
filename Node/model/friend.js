const { Model ,DataTypes} = require('sequelize');
const {sequelize} = require('./db');
const { Product } = require('./product');

class Friend extends Model{}

Friend .init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    }
}, {
    modelName:"friend",
    sequelize
})

Friend.belongsTo(User, {foreignKey:"from_id", targetKey:"id", onDelete:"CASCADE", onUpdate:"CASCADE"})
Friend.belongsTo(User, {foreignKey:"to_id", targetKey:"id", onDelete:"CASCADE", onUpdate:"CASCADE"})

User.hasMany(Friend, {foreignKey:"from_id"})
User.hasMany(Friend, {foreignKey:"to_id"})

Friend.sync();
module.exports = {Friend}
