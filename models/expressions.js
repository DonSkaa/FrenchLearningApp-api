module.exports = (sequelize, DataTypes) => {
    const Expression = sequelize.define('expressions', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_used_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
    }, {
        tableName: 'expressions',
        timestamps: false
    });
    return Expression
}
