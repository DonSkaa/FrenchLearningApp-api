const db = require("../models")
const { Op } = require("sequelize")

const UserPrograms = db.UserPrograms

const getCurrentUserProgram = async (req, res) => {

    let userId = req.query.user_id

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' })
    }

    try {
        const today = new Date()

        const currentPrograms = await UserPrograms.findOne({
            where: {
                user_id: userId,
                start_date: {
                    [Op.lte]: today,
                },
                end_date: {
                    [Op.gte]: today,
                },
            },
        })

        if (currentPrograms) {
            console.log(currentPrograms);
            return res.status(200).json({ data: currentPrograms })
        } else {
            console.log(currentPrograms);
            return res.status(204).send()
        }
    } catch (error) {
        console.error("Error in getUserPrograms:", error)
        return res.status(500).json({ error: 'Erreur lors de la récupération des userPrograms.' })
    }
}

module.exports = {
    getCurrentUserProgram,
}
