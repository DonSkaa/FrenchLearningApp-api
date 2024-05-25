const db = require("../models")

const UserMeta = db.UserMeta

const getUserMetas = async (req, res) => {

    let userId = req.query.user_id

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' })
    }

    try {
        const userMetas = await UserMeta.findOne({
            where: {
                user_id: userId,
            },
        })

        if (userMetas) {
            return res.status(200).json({ data: userMetas })
        } else {
            return res.status(204).send()
        }
    } catch (error) {
        console.error("Error in getUserMeta:", error)
        return res.status(500).json({ error: 'Erreur lors de la récupération des userMeta.' })
    }
}

const updateUserMeta = async (req, res) => {

    let updatedUserMeta = req.body.updatedUserMeta
    let userId = updatedUserMeta.user_id
    let cardId = updatedUserMeta.card_id

    if (!userId && !cardId) {
        return res.status(400).json({ error: 'User ID and Card ID is required' })
    }

    try {
        const [updated] = await UserMeta.update(
            updatedUserMeta,
            {
                where: {
                    user_id: userId,
                    card_id: cardId
                },
            })

        if (updated) {
            const updatedUserMeta = await UserMeta.findOne({ where: { user_id: userId } })
            return res.status(200).json({ data: updatedUserMeta })
        } else {
            throw new Error('UserMeta not found or nothing to update')
        }
    } catch (error) {
        console.error("Error updating UserMeta:", error)
        throw new Error(error.message)
    }
}

module.exports = {
    getUserMetas,
    updateUserMeta
}
