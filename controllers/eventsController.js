const db = require("../models")

const Event = db.Event

const getEvents = async (req, res) => {

    let userId
    let teacherId
    let eventsWithUser

    if (req.query.user_id) {
        userId = req.query.user_id
    }
    if (req.query.teacher_id) {
        teacherId = req.query.teacher_id
    }
    try {
        const events = userId
            ? await Event.findAll({ where: { user_id: userId } })
            : await Event.findAll({ where: { teacher_id: teacherId } })

        if (events.length <= 0) {
            return res.status(204).send()
        }
        if (teacherId) {
            eventsWithUser = await Promise.all(events.map(async event => {
                return await event.getData()
            }))
            return res.status(200).json({ data: eventsWithUser })
        } else {
            return res.status(200).json({ data: events })
        }

    } catch (error) {
        console.error("Error in getEvents:", error)
        return res.status(500).json({ error: 'Erreur lors de la récupération des events.' })
    }
}

const addEvent = async (req, res) => {
    try {
        const { event_type, date, start, end, user_id, teacher_id, meeting_link } = req.body.data

        const data = {
            event_type,
            date,
            start: `${date}T${start}:00`,
            end: `${date}T${end}:00`,
            user_id,
            teacher_id,
            meeting_link,
            title: event_type === 'Simulation' ? 'Mise en situation' : 'Conversation'
        }

        const event = await Event.create(data)
        if (event) {
            return res.status(201).send(event)
        } else {
            return res.status(409).send("Details are not correct")
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getEvents,
    addEvent,
}
