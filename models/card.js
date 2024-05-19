module.exports = (sequelize, DataTypes) => {
    const Card = sequelize.define('Card', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        recto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        verso: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'cards',
        timestamps: false
    })
    return Card
}
