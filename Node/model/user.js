const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./db');

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    role: {
        type: DataTypes.INTEGER,
        defaultValue: 0//0,1,2
    },
    pic_url: {
        type: DataTypes.STRING,
        defaultValue: "user.jpg"//react -> FormData
    },
    token: {
        type: DataTypes.STRING,
    },
    verify: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    active: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    modelName: "user",
    sequelize
})
User.sync();
module.exports = { User }
