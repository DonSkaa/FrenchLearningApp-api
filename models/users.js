module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            isEmail: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_program_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, { timestamps: true })

    User.prototype.getData = async function () {
        try {
            const db = require('../models');
            const UserMeta = db.userMeta;

            const userMeta = await UserMeta.findAll({ where: { user_meta_user_id: this.id } })
            return { User: this, userMeta }
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }
    return User
}
