const db = require("../models")

const UserProgram = db.UserProgram

const getUserPrograms = async (req, res) => {
    try {
        const userPrograms = await UserProgram.findOne({ where: { id: req.params.id } })

        if (userPrograms) {
            return res.status(200).json({ data: userPrograms })
        } else {
            return res.status(204).send()
        }
    } catch (error) {
        console.error("Error in getUserPrograms:", error)
        return res.status(500).json({ error: 'Erreur lors de la récupération des userPrograms.' })
    }
}

module.exports = {
    getUserPrograms,
}
