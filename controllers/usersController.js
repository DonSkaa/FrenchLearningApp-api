const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

const User = db.users

const signup = async (req, res) => {
    try {
        const { name, email, password, userProgramId } = req.body
        const data = {
            name,
            email,
            password: await bcrypt.hash(password, 10),
            user_program_id: userProgramId,
        }

        const user = await User.create(data)

        if (user) {
            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            })

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true })

            return res.status(201).send(user)
        } else {
            return res.status(409).send("Details are not correct")
        }
    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({
            where: {
                email: email
            }
        })

        if (user) {
            const isSame = await bcrypt.compare(password, user.password)

            if (isSame) {
                const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                })

                const now = new Date(Date.now())
                const expiresInMilliseconds = 1 * 24 * 60 * 60 * 1000
                const expirationTimestamp = now.getTime() + expiresInMilliseconds

                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true })

                const userDataWithMeta = await user.getData()

                console.log(userDataWithMeta);

                return res.status(201).send(
                    {
                        ...userDataWithMeta,
                        token: {
                            value: token,
                            expiresIn: expirationTimestamp
                        }
                    }
                )
            } else {
                return res.status(401).send("Authentication failed")
            }
        } else {
            return res.status(401).send("Authentication failed")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    signup,
    login,
}