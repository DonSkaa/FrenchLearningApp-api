const Expression = require('../models/expression');

const getAllExpressions = async (req, res) => {
    try {
        const expressions = await Expression.findAll()
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des expressions.' })
    }
}

module.exports = {
    getAllExpressions
}
