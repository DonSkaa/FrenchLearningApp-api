module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
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
    }, {
        tableName: 'user',
        timestamps: true
    })

    User.associate = function (models) {
        User.belongsTo(models.UserPrograms, {
            foreignKey: 'user_programs_id',
            as: 'user_programs'
        })
    }

    User.prototype.getData = async function () {
        try {
            const formatedUser = {
                id: this.dataValues.id,
                email: this.dataValues.email,
                name: this.dataValues.name,
                user_programs_id: this.dataValues.user_programs_id,
            }

            return formatedUser

        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }
    return User
}
