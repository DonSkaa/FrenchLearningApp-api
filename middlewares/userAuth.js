const express = require("express");
const db = require("../models");
const User = db.users;

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

module.exports = {
    saveUser,
}