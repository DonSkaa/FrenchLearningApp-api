module.exports = (sequelize, DataTypes) => {
    const Deck = sequelize.define('Deck', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        thematic: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'decks',
        timestamps: false
    })

    return Deck
}
