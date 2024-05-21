const db = require("../models")
const { Op } = require("sequelize")

const Deck = db.Deck

const getDecksByIds = async (req, res) => {

    const deck_ids = req.query.deck_ids

    if (!deck_ids || !Array.isArray(deck_ids)) {
        return res.status(400).json({ error: 'deck_ids is required and should be an array' })
    }

    try {
        const decks = await Deck.findAll({
            where: {
                id: {
                    [Op.in]: deck_ids,
                },
            },
        })

        const decksWithCards = await Promise.all(decks.map(async deck => {
            return await deck.getData()
        }))

        if (decksWithCards.length > 0) {
            return res.status(200).json({ data: decksWithCards })
        } else {
            return res.status(204).send()
        }
    } catch (error) {
        console.error("Error in getDecksByIds:", error)
        return res.status(500).json({ error: 'Erreur lors de la récupération des decks.' })
    }
}

module.exports = {
    getDecksByIds,
}
