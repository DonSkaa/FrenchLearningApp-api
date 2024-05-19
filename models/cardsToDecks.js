module.exports = (sequelize, DataTypes) => {
    const CardsToDecks = sequelize.define('CardsToDecks', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        from_card_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        to_deck_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        tableName: 'cards_to_decks',
        timestamps: false
    })
    return CardsToDecks
}
