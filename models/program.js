module.exports = (sequelize, DataTypes) => {
  const Program = sequelize.define(
    "Program",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      days_duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "programs",
      timestamps: false,
    }
  );
  return Program;
};
