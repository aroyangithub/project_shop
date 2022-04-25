const { Sequelize } = require('sequelize')
const config = require('./../config/config')

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: config.dialect,
    port:config.port
})

module.exports = { sequelize }