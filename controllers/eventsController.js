const db = require("../models")

const Event = db.Event

const getEventsByUserId = async (req, res) => {

    let userId = req.query.user_id

    try {
        const events = await Event.findAll({ where: { user_id: userId } })

        if (events.length <= 0) {
            return res.status(204).send()
        }
        return res.status(200).json({ data: events })

    } catch (error) {
        console.error("Error in getEventsByUserId:", error)
        return res.status(500).json({ error: 'Erreur lors de la récupération des events.' })
    }
}

module.exports = {
    getEventsByUserId,
}
