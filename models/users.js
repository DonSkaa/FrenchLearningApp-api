

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
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
    }, { timestamps: true },)
    return User
}