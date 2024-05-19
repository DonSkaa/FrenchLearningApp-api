const fs = require('fs')
const path = require('path')
const { Sequelize, DataTypes } = require('sequelize')
const basename = path.basename(__filename)

const sequelize = new Sequelize('frenchlearningapp', 'root', 'root', {
    host: '127.0.0.1',
    port: 3306, // Port par défaut pour MySQL
    dialect: 'mysql',
    logging: console.log
})

sequelize.authenticate().then(() => {
    console.log(`Database connected to discover`)
}).catch((err) => {
    console.log(err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

// db.userMeta = require('./userMeta')(sequelize, DataTypes)
// db.user = require('./user')(sequelize, DataTypes)
// db.expression = require('./expression')(sequelize, DataTypes)
// db.card = require('./card')(sequelize, DataTypes)
// db.cardsToDecks = require('./cardsToDecks')(sequelize, DataTypes)
// db.deck = require('./deck')(sequelize, DataTypes)
// db.event = require('./event')(sequelize, DataTypes)
// db.program = require('./program')(sequelize, DataTypes)
// db.userPrograms = require('./userPrograms')(sequelize, DataTypes)

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            (file.slice(-3) === '.js' || file.slice(-3) === '.ts') &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

module.exports = db