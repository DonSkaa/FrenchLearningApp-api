module.exports = (sequelize, DataTypes) => {
    const UserPrograms = sequelize.define('UserPrograms', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        start_date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        end_date: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'user_programs',
        timestamps: false
    })

    UserPrograms.associate = function (models) {
        UserPrograms.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        })
        UserPrograms.belongsTo(models.Program, {
            foreignKey: 'program_id',
            as: 'program'
        })
    }

    return UserPrograms
}
