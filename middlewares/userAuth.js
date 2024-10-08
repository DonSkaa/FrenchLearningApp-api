const db = require("../models");
const User = db.User;
const jwt = require("jsonwebtoken");

const saveUser = async (req, res, next) => {
  try {
    const username = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (username) {
      return res.status(409).send({ message: "username already taken" });
    }

    const emailcheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (emailcheck) {
      return res.status(409).send({ message: "email already taken" });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next();
    return;
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("err", err);
      return res.status(403).send({ message: "Token is invalid" });
    }

    if (decoded) {
      (async function () {
        const user = await User.findOne({
          where: {
            id: decoded.id,
          },
          raw: true,
        });

        req.user = user;
        next();
      })();
    } else {
      next();
    }
  });
};

module.exports = {
  saveUser,
  authenticateToken,
};
