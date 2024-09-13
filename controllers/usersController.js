const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const { escapeHTML, verifyCaptcha } = require("../utils");

const User = db.User;

const signup = async (req, res) => {
  try {
    const {
      username,
      name,
      last_name,
      date_of_birth,
      type,
      program_duration,
      email,
      password,
      teacher_id,
      timezone,
      captchaToken,
    } = req.body;
    const data = {
      username,
      name,
      last_name,
      date_of_birth,
      type,
      program_duration,
      email,
      password: await bcrypt.hash(password, 10),
      teacher_id: type === "teacher" ? null : teacher_id,
    };

    const captchaVerified = await verifyCaptcha(captchaToken, "signup");

    if (!captchaVerified) {
      return res
        .status(400)
        .json({ message: "Échec de la validation reCAPTCHA." });
    }

    const user = await User.create(data);

    // if (user.type === "student") {
    //   const userPrograms = await db.UserPrograms.create({
    //     user_id: user.id,
    //     program_id: user.program_duration === "4" ? 1 : 2,
    //   });

    //   user.user_programs_id = userPrograms.id;
    //   await user.save();
    // }

    if (user) {
      if (!user.type) {
        const token = jwt.sign(
          { id: user.id, timezone },
          process.env.SECRET_KEY,
          {
            expiresIn: 2 * 24 * 60 * 60 * 1000,
          }
        );

        res.cookie("jwt", token, {
          maxAge: 2 * 60 * 60 * 1000,
          httpOnly: true,
        });
      }

      const formatedUser = {
        id: user.id,
        type: user.type,
        email: user.email,
        username: user.username,
        name: user.name,
        last_name: user.last_name,
        date_of_birth: user.date_of_birth,
        user_programs_id: user.user_programs_id,
        teacher_id: user.teacher_id,
      };
      return res.status(201).send(formatedUser);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password, timezone, captchaToken } = req.body;

    const captchaVerified = await verifyCaptcha(captchaToken, "login");

    if (!captchaVerified) {
      return res
        .status(400)
        .json({ message: "Échec de la validation reCAPTCHA." });
    }

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        const token = jwt.sign(
          { id: user.id, timezone },
          process.env.SECRET_KEY,
          {
            expiresIn: 2 * 60 * 60 * 1000,
          }
        );

        const now = new Date(Date.now());
        const expiresInMilliseconds = 1 * 24 * 60 * 60 * 1000;
        const expirationTimestamp = now.getTime() + expiresInMilliseconds;

        res.cookie("jwt", token, {
          maxAge: 2 * 60 * 60 * 1000,
          httpOnly: true,
        });

        const userDataWithMeta = await user.getData();

        return res.status(201).send({
          ...userDataWithMeta,
          token: {
            value: token,
            expiresIn: expirationTimestamp,
          },
        });
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
  }
};

const user = (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).send("Unauthorized");
  } else {
    const formatedUser = {
      id: user.id,
      type: escapeHTML(user.type),
      email: escapeHTML(user.email),
      username: escapeHTML(user.username),
      name: escapeHTML(user.name),
      last_name: escapeHTML(user.last_name),
      date_of_birth: user.date_of_birth,
      user_programs_id: user.user_programs_id,
      teacher_id: user.teacher_id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return res.send(formatedUser);
  }
};

const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  return res.status(200).send({ message: "Déconnexion réussie" });
};

const updatePassword = async (req, res) => {
  const { currentPassword, newPassword, userId } = req.body.formatedData;

  if (!currentPassword || !newPassword || !userId) {
    return res.status(400).json({
      error: "User id, current password, and new password are required",
    });
  }

  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isSame = await bcrypt.compare(currentPassword, user.password);
    if (!isSame) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    const updatedPassword = await bcrypt.hash(newPassword, 10);
    const [updatedUser] = await User.update(
      { password: updatedPassword },
      {
        where: {
          id: userId,
        },
      }
    );

    if (updatedUser) {
      return res.status(200).json({ message: "Password updated successfully" });
    } else {
      return res.status(400).json({ error: "Failed to update password" });
    }
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const getCurrentStudents = async (req, res) => {
  const { teacher_id, offset = 0, limit = 10 } = req.query;

  if (!teacher_id) {
    return res.status(400).json({ error: "teacher_id is required" });
  }

  try {
    const { count, rows: currentStudents } = await User.findAndCountAll({
      where: {
        teacher_id: teacher_id,
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
      attributes: { exclude: ["password"] },
    });

    // const formatedCurrentStudents =

    return res.status(200).json({
      data: currentStudents,
      totalItems: count,
    });
  } catch (error) {
    console.error("Error in getCurrentStudents:", error);
    return res.status(500).json({
      error: "Erreur lors de la récupération des currentStudents.",
    });
  }
};

module.exports = {
  signup,
  login,
  user,
  logout,
  updatePassword,
  getCurrentStudents,
};
