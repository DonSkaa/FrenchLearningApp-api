const db = require("../models");
const User = db.User;
const jwt = require("jsonwebtoken");

const saveUser = async (req, res, next) => {
    try {
        const username = await User.findOne({
            where: {
                name: req.body.name,
            },
        })
        if (username) {
            return res.status(409).send({ message: "username already taken" })
        }

        const emailcheck = await User.findOne({
            where: {
                email: req.body.email,
            },
        })

        if (emailcheck) {
            return res.status(409).send({ message: "email already taken" })
        }

        next()
    } catch (error) {
        console.log(error)
    }
}

const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt

    if (!token) {
        return res.status(401).send({ message: 'Token is missing' })
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Token is invalid' })
        }

        req.user = decoded
        next()
    })
}

module.exports = {
    saveUser,
    authenticateToken,
}