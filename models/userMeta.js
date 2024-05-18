module.exports = (sequelize, DataTypes) => {
    const userMeta = sequelize.define('user_meta', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        last_review_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        times_reviewed: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        user_meta_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        card_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'user_meta',
        timestamps: false
    });
    return userMeta
}
