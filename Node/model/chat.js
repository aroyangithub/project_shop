const { Model ,DataTypes} = require('sequelize');
const {sequelize} = require('./db');
const { Product } = require('./product');
const { User } = require('./user');

class Chat extends Model{}

Chat.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    text:{
        type:DataTypes.STRING,
        primaryKey:true
    }

}, {
    modelName:"chat",
    sequelize
})
Chat.belongsTo(User, {foreignKey:"from_id", targetKey:"id", onDelete:"CASCADE", onUpdate:"CASCADE"})
Chat.belongsTo(User, {foreignKey:"to_id", targetKey:"id", onDelete:"CASCADE", onUpdate:"CASCADE"})

User.hasMany(Chat, {foreignKey:"from_id"})
User.hasMany(Chat, {foreignKey:"to_id"})

Chat.sync();
module.exports = {Chat}
