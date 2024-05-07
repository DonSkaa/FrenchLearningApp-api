const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('frenchlearningapp', 'root', 'root', {
    host: '127.0.0.1',
    port: 3306, // Port par défaut pour MySQL
    dialect: 'mysql',
    logging: false,
})

sequelize.authenticate().then(() => {
    console.log(`Database connected to discover`)
}).catch((err) => {
    console.log(err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./users')(sequelize, DataTypes)
db.expressions = require('./expressions')(sequelize, DataTypes)

module.exports = db