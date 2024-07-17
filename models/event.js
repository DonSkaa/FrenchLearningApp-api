module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      event_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      meeting_link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "events",
      timestamps: false,
    }
  );

  Event.associate = function (models) {
    Event.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  Event.prototype.getData = async function () {
    try {
      const db = require(".");
      const User = db.User;
      const studentId = this.dataValues.user_id;

      const user = await User.findOne({
        where: { id: studentId },
        raw: true,
      });

      const formatedUser = {
        ...this.dataValues,
        user: user,
      };

      return formatedUser;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  return Event;
};
