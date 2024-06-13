module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define(
    "Card",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      front_side: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      back_side: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "cards",
      timestamps: false,
    }
  );

  Card.prototype.getData = async function () {
    try {
      const db = require(".");
      const UserMeta = db.UserMeta;

      const userMetas = await UserMeta.findOne({
        where: { card_id: this.id },
        raw: true,
      });

      return {
        ...this.dataValues,
        user_meta: userMetas,
      };
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  return Card;
};
