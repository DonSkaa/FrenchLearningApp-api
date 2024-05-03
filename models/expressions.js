const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const Expression = sequelize.define('Expression', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'expressions',
    timestamps: true
});

module.exports = Expression