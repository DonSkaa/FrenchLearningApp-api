const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

const User = db.User

const signup = async (req, res) => {
    try {
        const { name, type, email, password, teacher_id } = req.body
        const data = {
            name,
            type,
            email,
            password: await bcrypt.hash(password, 10),
            teacher_id: type === "teacher" ? null : teacher_id
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

const user = (req, res) => {
    const user = req.user
    if (!user) {
        return res.status(401).send("Unauthorized")
    } else {
        return res.send(user)
    }
}

const getCurrentStudents = async (req, res) => {

    const teacher_id = req.query.teacher_id

    if (!teacher_id) {
        return res.status(400).json({ error: 'teacher_id is required' })
    }

    try {
        const currentStudents = await User.findAll({
            where: {
                teacher_id: teacher_id,
            },
        })

        if (currentStudents.length > 0) {
            return res.status(200).json({ data: currentStudents })
        }
    } catch (error) {
        console.error("Error in getCurrentStudents:", error)
        return res.status(500).json({ error: 'Erreur lors de la récupération des currentStudents.' })
    }
}


module.exports = {
    signup,
    login,
    user,
    getCurrentStudents,
}