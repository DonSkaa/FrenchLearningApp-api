module.exports = (sequelize, DataTypes) => {
    const userPrograms = sequelize.define('user_programs', {
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
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        program_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'user_programs',
        timestamps: false
    });
    return userPrograms
}
