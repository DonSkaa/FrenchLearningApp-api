const { Op } = require("sequelize")

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

    Deck.prototype.getData = async function () {
        try {
            const db = require('.')
            const CardsToDecks = db.CardsToDecks
            const Card = db.Card

            const cardsToDecks = await CardsToDecks.findAll({
                where: { to_deck_id: this.id },
                raw: true,
            })

            const cardIds = cardsToDecks.map(item => item.from_card_id)

            const cards = await Card.findAll({
                where: {
                    id: {
                        [Op.in]: cardIds,
                    },
                },
                raw: true,
            })

            const formatedDeck = {
                ...this.dataValues, cards: cards
            }
            return formatedDeck

        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }
    return Deck
}
