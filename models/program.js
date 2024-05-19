module.exports = (sequelize, DataTypes) => {
    const Program = sequelize.define('Program', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        days_duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        tableName: 'programs',
        timestamps: false
    });
    return Program
}
