const { Model ,DataTypes} = require('sequelize');
const {sequelize} = require('./db');

class Request extends Model{}

Request.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    }
}, {
    modelName:"request",
    sequelize
})
Request.belongsTo(User, {foreignKey:"from_id", targetKey:"id", onDelete:"CASCADE", onUpdate:"CASCADE"})
Request.belongsTo(User, {foreignKey:"to_id", targetKey:"id", onDelete:"CASCADE", onUpdate:"CASCADE"})

User.hasMany(Request, {foreignKey:"from_id"})
User.hasMany(Request, {foreignKey:"to_id"})
Request.sync();
module.exports = {Request}
