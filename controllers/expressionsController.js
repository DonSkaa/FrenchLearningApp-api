const { format } = require('date-fns')
const { Op } = require('sequelize')
const db = require("../models")

const Expression = db.expressions

const getAllExpressions = async (req, res) => {
    try {
        const expressions = await Expression.findAll()

        if (expressions.length <= 0) {
            return res.status(204).send()
        }
        return res.status(200).json({ data: expressions })
    } catch (error) {
        console.error("Error in getAllExpressions:", error)
        return res.status(500).json({ error: 'Erreur lors de la récupération des expressions.' })
    }
}

const getDayExpression = async (req, res) => {
    try {
        const today = format(new Date(), 'yyyy-MM-dd')

        const todaysExpression = await Expression.findOne({
            where: { last_used_date: today },
            raw: true,
        })

        if (todaysExpression) {
            return res.status(200).json({ data: todaysExpression })
        } else {
            const expression = await Expression.findOne({
                order: [['last_used_date', 'ASC']],
                where: {
                    [Op.or]: [
                        { last_used_date: null },
                        { last_used_date: { [Op.ne]: today } },
                    ],
                },
                raw: true,
            })

            if (!expression) {
                return res.status(204).send()
            }

            if (!expression.last_used_date) {
                await Expression.update(
                    { last_used_date: today },
                    { where: { id: expression.id, last_used_date: { [Op.is]: null } } }
                )
            }
            return res.status(200).json({ data: expression })
        }

    } catch (error) {
        console.error("Error in getDayExpression:", error)
        return res.status(500).json({ error: 'Erreur lors de la récupération des expressions.' })
    }
}

module.exports = {
    getAllExpressions,
    getDayExpression,
}
