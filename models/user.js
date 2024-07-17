module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        isEmail: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "user",
      timestamps: true,
    }
  );

  User.associate = function (models) {
    User.belongsTo(models.UserPrograms, {
      foreignKey: "user_programs_id",
      as: "user_programs",
    });
  };

  User.prototype.getData = async function () {
    try {
      const formatedUser = {
        id: this.dataValues.id,
        type: this.dataValues.type,
        email: this.dataValues.email,
        name: this.dataValues.name,
        user_programs_id: this.dataValues.user_programs_id,
        teacher_id: this.dataValues.teacher_id,
      };

      return formatedUser;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
  return User;
};
