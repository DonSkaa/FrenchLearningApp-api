module.exports = (sequelize, DataTypes) => {
    const UserMeta = sequelize.define('UserMeta', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        last_review_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        last_difficulty_level: {
            type: DataTypes.STRING,
            allowNull: true
        },
        times_reviewed: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    }, {
        tableName: 'user_meta',
        timestamps: false
    })

    UserMeta.associate = function (models) {
        UserMeta.belongsTo(models.Card, {
            foreignKey: 'card_id',
            as: 'card'
        })
        UserMeta.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        })
    }

    return UserMeta
}
