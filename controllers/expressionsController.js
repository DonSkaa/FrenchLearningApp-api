const Expression = require('../models/expressions');

const getAllExpressions = async (req, res) => {
    try {
        const expressions = await Expression.findAll()
        res.status(200).send({ data: expressions })
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des expressions.' })
    }
}

module.exports = {
    getAllExpressions
}
